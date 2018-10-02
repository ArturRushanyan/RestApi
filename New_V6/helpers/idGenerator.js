class IdGenretator {
    constructor() {

    }

    id() {
        return Date.now();
    }
};

export default new IdGenretator();
