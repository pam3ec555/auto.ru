export default class AddPostModel {
    private formData: FormData;

    constructor(formData: FormData) {
        this.formData = formData;
    }

    public async save() {
        return fetch(`/add-post/create`, {
                method: `POST`,
                body: this.formData
            })
            .then((res) => {
                console.log(res);
            })
            .catch((): void => {
                throw new Error(`Failed to add post`);
            });
    }
}
