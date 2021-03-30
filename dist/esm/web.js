var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
import * as FileSaver from 'file-saver';
export class FileSharerPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'FileSharer',
            platforms: ['web']
        });
    }
    share(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let blob = new Blob([this.toByteArray(options.base64Data)], { type: options.contentType });
                if (/CriOS/i.test(navigator.userAgent) &&
                    /iphone|ipod|ipad/i.test(navigator.userAgent)) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (typeof reader.result === 'string') {
                            window.location.href = reader.result;
                        }
                    };
                    reader.onloadend = () => setTimeout(() => setLoading(false), 250);
                    reader.readAsDataURL(blob);
                }
                else {
                    FileSaver.saveAs(blob, options.filename);
                }
                resolve();
            });
        });
    }
    toByteArray(base64Data) {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        return new Uint8Array(byteNumbers);
    }
}
const FileSharer = new FileSharerPluginWeb();
export { FileSharer };
// this does not work for angular. You need to register the plugin in app.component.ts again.
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FileSharer);
//# sourceMappingURL=web.js.map