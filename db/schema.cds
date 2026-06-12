using {managed} from '@sap/cds/common';

context ibp {

    entity PeggingData : managed {
        key DetailedPeggingUUID           : UUID;
            IBPTransaclSnpshtUUID         : UUID;
            SimulationVersionID           : Integer;
            SupplyElementID               : Decimal;
            SupplyDocInt                  : Decimal;
            SupplyDocItem                 : String(30);
            SupplyDocScheduleLine         : String(30);
            SupplyDocExt                  : String(30);
            SupplyProductID               : String(30);
            SupplyLocationID              : String(30);
            SupplyDocType                 : String(30);
            GatingInd                     : String(30);
            GatingFctrTp                  : String(30);
            GatingRsce                    : String(30);
            MultiGatingFctrInd            : String(30);
            DemandElementId               : Decimal;
            DemandDocInt                  : Decimal;
            DemandDocItem                 : String(30);
            DemandDocScheduleLine         : String(30);
            DemandDocExt                  : String(30);
            DemandDocType                 : String(30);
            PrimaryDemandElementId        : Decimal;
            PrimaryDemandDocInt           : Decimal;
            PrimaryDemandDocItem          : String(30);
            PrimaryDemandDocScheduleLine  : String(30);
            PrimaryDemandDocExt           : String(30);
            PrimaryDemandProductID        : String(30);
            PrimaryDemandLocationID       : String(30);
            PrimaryDemandDocType          : String(30);
            PrimDemandPeggedDateTime      : Decimal;
            NetworkPeggingLevel           : Integer;
            SupplyQuantityUnit            : String(30);
            PrimaryDemandQuantityUnit     : String(30);
            TotalSupplyQuantity           : Decimal;
            PeggedSupplyQuantity          : Decimal;
            AffectedPrimaryDemandQuantity : Decimal;
            SupReqdStartDateTime          : Decimal;
            SupReqdGRStartDateTime        : Decimal;
            SupReqdEndDateTime            : Decimal;
            PlanningAreaID                : String(30);
            VersionID                     : String(30);
    }
}
