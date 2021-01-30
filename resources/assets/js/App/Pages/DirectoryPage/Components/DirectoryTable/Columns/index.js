import buyers from './buyersColumns';
import sellers from './sellersColumns';
import exporters from './exportersColumns';
import commodities from './commoditiesColumns';
import banks from './banksColumns';
import logos from './logosColumns';
import { DIRECTORY_TYPE } from '@Context/Directory/Store/constants';

const columns = {
    [DIRECTORY_TYPE.BUYERS]: buyers,
    [DIRECTORY_TYPE.SELLERS]: sellers,
    [DIRECTORY_TYPE.EXPORTERS]: exporters,
    [DIRECTORY_TYPE.COMMODITIES]: commodities,
    [DIRECTORY_TYPE.BANKS]: banks,
    [DIRECTORY_TYPE.LOGOS]: logos,
};

export default columns;
