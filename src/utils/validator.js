function Validate(data) {
    this.validation = true;

    this.end = () => {
        return this.validation;
    }

    const testRegExp = (regExpString) => { // 정규표현식 체크
        if (!this.validation) {
            return this;
        }

        const regExp = new RegExp(regExpString);
        this.validation = regExp.test(data);

        return this;
    }

    const length = (min = -Infinity, max = Infinity) => { // 길이 체크
        if (!this.validation) {
            return this;
        }

        if (data.length < min || data.length > max) {
            this.validation = false;
        }

        return this;
    }

    const range = (min = -Infinity, max = Infinity) => { // 범위 체크
        if (!this.validation) {
            return this;
        }

        if (data < min || data > max) {
            this.validation = false;
        }

        return this;
    }

    const includes = (exists) => { // 존재 여부
        if (!this.validation) {
            return this;
        }

        if (Array.isArray(exists)) {
            if (!exists.includes(data)) {
                this.validation = false;
            }
        } else if (data != exists) {
            this.validation = false;
        }

        return this;
    }

    this.testRegExp = testRegExp;
    this.range = range;
    this.length = length;
    this.includes = includes;

    // type check ========================================
    this.isNumber = () => {
        if (typeof data !== 'number' || isNaN(data)) {
            this.validation = false;
        }

        return this;
    }

    this.isString = () => {
        if (typeof data !== 'string') {
            this.validation = false;
        }

        return this;
    }

    this.isArray = () => {
        if (!Array.isArray(data)) {
            this.validation = false;
        }

        return this;
    }

    this.isObject = (objectType) => {
        if (typeof data !== 'object') {
            this.validation = false;
        }

        return this;
    }

    this.isNotNull = () => {
        if (data === null) {
            this.validation = false;
        }

        return this;
    }

    this.isNull = () => {
        if (data !== null) {
            this.validation = false;
        }

        return this;
    }

    this.isBoolean = () => {
        if (typeof data !== 'boolean') {
            this.validation = false;
        }
    }
}

const validator = (data) => {
    const myVlidate = new Validate(data);

    return myVlidate;
};

module.exports = validator;
