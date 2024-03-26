export class Utils {
    public static getCurrentDateTime(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}${hour}${minute}${second}`;
    }

    public static generateRandomString() {
        const characterSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let randomString = '';
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * characterSet.length);
          randomString += characterSet.charAt(randomIndex);
        }
        return randomString;
      }

    public static replaceWhiteSpaceToNbsb(text: string): string {
        return text.replace(/ /g, '\u00a0');
    }  

    public static isChildArrayIncluded(parent: string[], child: string[]){
        for(const element of child) {
            if(!parent.includes(element)){
                console.log(element);
                return false;
            }
        }
        
        return true;
    }

    public static wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static isArraySorted(array: string[]): boolean {
        if(array.length < 2) return true;
        
        for(let i = 0; i < array.length - 1; i++) {
            if(array[i].localeCompare(array[i + 1]) > 0) return false;
        }

        return true;
    }
}