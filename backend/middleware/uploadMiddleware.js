import multer from "multer";

const storage=multer.memoryStorage();

export const upload=multer({

storage,

limits:
{
files:6,

fileSize:50*1024*1024
}

});