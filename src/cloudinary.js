import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
    cloud: {
        cloudName: 'ddbyqg5d0', // Your Cloud Name
    },
});

export default cld;