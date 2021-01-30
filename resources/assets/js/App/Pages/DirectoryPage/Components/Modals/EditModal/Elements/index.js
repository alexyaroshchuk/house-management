import editBuyersElements from './buyersElements';
import editSellersElements from './sellersElements';
import editExportersElements from './exportersElements';
import editCommoditiesElements from './commoditiesElements';
import editBanksElements from './banksElements';
import editLogosElements from './logosElements';
import { DIRECTORY_TYPE } from '@Context/Directory/Store/constants';

const editModalElements = {
    [DIRECTORY_TYPE.BUYERS]: editBuyersElements,
    [DIRECTORY_TYPE.SELLERS]: editSellersElements,
    [DIRECTORY_TYPE.EXPORTERS]: editExportersElements,
    [DIRECTORY_TYPE.COMMODITIES]: editCommoditiesElements,
    [DIRECTORY_TYPE.BANKS]: editBanksElements,
    [DIRECTORY_TYPE.LOGOS]: editLogosElements,
};

export default editModalElements;
