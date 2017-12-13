import sendSurcharge from './sendSurcharge';
import { setCron } from '../utils';

/**
 * Send surcharge job
 *
 * @returns {func} an instance of cron job
 */
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

export default {};
