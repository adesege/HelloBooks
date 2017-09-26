import sendSurcharge from './sendSurcharge';
import { setCron } from '../utils';

export const sendSurchargeJob = () =>
  setCron({
    cronTime: '* * * * * *',
    onTick: sendSurcharge,
    timeZone: 'Africa/Lagos',
    start: true
  });

if (require.main === module) {
  sendSurchargeJob();
}
export default {

};
