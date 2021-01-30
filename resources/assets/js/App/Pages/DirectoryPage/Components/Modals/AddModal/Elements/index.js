import addBuyersElements from './buyersElements';
import addSellersElements from './sellersElements';
import addExportersElements from './exportersElements';
import addCommoditiesElements from './commoditiesElements';
import addBanksElements from './banksElements';
import addLogosElements from './logosElements';
import { DIRECTORY_TYPE } from '@Context/Directory/Store/constants';

const addModalElements = {
    [DIRECTORY_TYPE.BUYERS]: addBuyersElements,
    [DIRECTORY_TYPE.SELLERS]: addSellersElements,
    [DIRECTORY_TYPE.EXPORTERS]: addExportersElements,
    [DIRECTORY_TYPE.COMMODITIES]: addCommoditiesElements,
    [DIRECTORY_TYPE.BANKS]: addBanksElements,
    [DIRECTORY_TYPE.LOGOS]: addLogosElements,
};

export default addModalElements;
