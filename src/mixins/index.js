import { Toast } from 'mint-ui';
export default {
    methods: {
        toast(str) {
            let instance = Toast(str);
            setTimeout(() => {
              instance.close();
            }, 2000);
        }

    }
}