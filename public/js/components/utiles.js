"use strict";

class Utiles {
    get htmlToElements() {
        return html => {
            const template = document.createElement("template");
            template.innerHTML = html;

            return template.content.childNodes;
        };
    }

    get noop() {
        return () => null;
    }

    moveToElem(elem) {
        const jump = parseInt(elem.getBoundingClientRect().top * 0.3);
        document.body.scrollTop += jump;
        document.documentElement.scrollTop += jump;
        if (!elem.lastjump || elem.lastjump > Math.abs(jump)) {
            elem.lastjump = Math.abs(jump);
            setTimeout(() => this.moveToElem(elem), 20);
        } 
        else {
            elem.lastjump = null;
        }
    }

    assignMixin({ dstObject, sourceClass }) {
        const properties = Object.getOwnPropertyNames(sourceClass.prototype);
    
        for (let property of properties) {   
            if (!dstObject[property]) {
                Object.defineProperty(dstObject, property, {
                    value: sourceClass.prototype[property].bind(dstObject)
                });
            }
        }

        return dstObject;
    }
}

const utiles = new Utiles();

export default utiles;
