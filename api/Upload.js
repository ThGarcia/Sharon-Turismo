import { google } from "googleapis";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    const file = files.file;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    const response = await drive.files.create({
      requestBody: {
        name: file.originalFilename,
        mimeType: "application/pdf",
        parents: [process.env.GOOGLE_DRIVE_FOLDER],
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(file.filepath),
      },
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const link = `https://drive.google.com/file/d/${fileId}/view`;

    res.json({ link });
  });
}
