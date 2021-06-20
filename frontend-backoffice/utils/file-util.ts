

export class FileUtil {

    static parseToBase64Url(file): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            // @ts-ignore
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}