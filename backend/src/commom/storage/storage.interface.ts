export interface FileUpload {

    filename: string

    fileContent: string

    mimetype?: string
}

export interface StorageInterface {

    upload(fileUpload: FileUpload): Promise<any>
}   