import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
export const fileUpload = (folderName) => {
 const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folderName}`)
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + '-' + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image'))
            cb(null, true)
        else {
            cb('images only', false)
        }
    }
    const upload = multer({ storage, fileFilter })
    return upload
}
export const singleFile = (fieldName, folderName) => {
    return fileUpload(folderName).single(fieldName)
}
export const mixedFiles = (arrayOfFields, folderName) => {
    return fileUpload(folderName).fields(arrayOfFields)
}