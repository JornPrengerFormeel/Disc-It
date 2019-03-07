import { DiscItApi } from '../../../api/discit-api/DiscItApi';

export class GreetingPagePresenter {
    static linkButtonClicked() {
        DiscItApi.sendLoginRequest()
            .then((response) => {
                window.location = response;
            })
            .catch(console.log);
    }
}
