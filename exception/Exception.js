class Exception extends Error {
    constructor(code, massage) {
        super();
        this.code = code;
        this.massage = massage;
    }
}