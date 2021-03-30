import {WebPlugin} from '@capacitor/core';
import {FileSharerPlugin, ShareFileOptions} from "./definitions";
import * as FileSaver from 'file-saver';

export class FileSharerPluginWeb extends WebPlugin implements FileSharerPlugin {

    constructor() {
        super({
            name: 'FileSharer',
            platforms: ['web']
        });
    }

    async share(options: ShareFileOptions): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let blob = new Blob([this.toByteArray(options.base64Data)], { type: options.contentType });
            if (
                /CriOS/i.test(navigator.userAgent) &&
                /iphone|ipod|ipad/i.test(navigator.userAgent)
            ) {
                const reader = new FileReader()
                reader.onload = () => {
                    if (typeof reader.result === 'string') {
                        window.location.href = reader.result
                    }
                }
                reader.onloadend = () => setTimeout(() => setLoading(false), 250)
                reader.readAsDataURL(blob)
            } else {
                FileSaver.saveAs(blob, options.filename);
            }
            resolve();
        });
    }

    toByteArray(base64Data: string): Uint8Array {
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
