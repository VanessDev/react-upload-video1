

export async function uploadVideo(videoData) {
    const sql = `
     INSERT INTO videos
     (title,description,filename,original_name,mime_type,size,path)
     VALUES(?,?,?,?,?,?)`;

    await pool.execute(sql, [
      title,
      description,
      req.file.filename,
      req.file.originalname,
      req.file.mimetype,
      req.file.size,
      req.file.path,
    ]);
return {
    id: result.insertId,
    ...videoData,
}
}