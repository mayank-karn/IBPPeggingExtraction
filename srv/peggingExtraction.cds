using { ibp  as IBP} from '../db/schema';

@(path: '/pegging')
service peggingExtraction {
    
    @open
    type object {};

    action getData(startDate: String, endDate: String) returns object;

    entity PeggingData as projection on IBP.PeggingData;

    action insertBulkPeggingData(peggingData: object) returns String;
}