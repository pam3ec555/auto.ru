import {Car, CarPhotos} from './car/car';
import DefaultAdapter from './default-adapter';

export default class CarAdapter extends DefaultAdapter {
    public preprocess(data: Car): Car {
        const preprocessed: Car = (Object as any).assign({}, data);
        const photos: {
            [name: number]: CarPhotos
        } = preprocessed.photos;
        preprocessed.photos = [];

        for (const key in photos) {
            preprocessed.photos.push(photos[key]);
        }

        return preprocessed;
    }
}
