/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { Fragment, useMemo } from "react";
import styled from "styled-components";
import { Control } from "react-hook-form";
import { AccessPointFormValues } from "../types";
import {
  LoadingBar,
  Spinner,
  Typography,
  TypographyVariant,
} from "../../../../../../components/ui-kit";
import { Filter, ImageIcon } from "../../../../../../components/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { useModalManager } from "../../../../../../context/ModalManager";
import NetworksFilterModal from "./modal/NetworkFiltersModal";
import { AccessPointsFilters } from "../../access-points-list/hooks/useAccessPointsList";
import AddNetworkModal from "./modal/AddNetworkModal";
import { components } from "../../../../../../util/backend-api-types";

const RightPanelContainer = styled.div`
  max-height: 1995px;
  min-height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 10px;

  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 30px 15px 30px;
  border-bottom: 1px solid #eee;
`;

const NetworkCard = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 30px;

  background-color: ${(props) => (props.selected ? "#f2f4ff" : "#fff")};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #f8f8ff;
  }
`;
export interface IRightPanelProps {
  control: Control<AccessPointFormValues>;
  currentCategories: Array<{ category?: string }>;
  append: () => void;
  remove: (index: number) => void;
}

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-right: 10px;
`;

const Label = styled(Typography)``;

const Img = styled.img`
  width: 100%;
  object-fit: contain;
`;

const NoImageBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 5px;
  background-color: #fff;
  z-index: 2;
  svg {
    scale: 2;
  }
`;

const ScrollableArea = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2cd19d80;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #eeeeee;
  }
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ScrollSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFilterIcon = styled(Filter)`
  cursor: pointer;

  /* margin-left: 5px; */
`;

const StyledLoadingBar = styled(LoadingBar)`
  margin-top: 0px;
  margin-bottom: 1px;
`;

const InfiniteScrollContent = styled.div``;

const LabelAndFilterBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterIconWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const GreenDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #6cb155;
  position: absolute;
  top: 0;
  left: 10px;
`;

const NoNetworks = styled(Typography)`
  padding: 20px;
`;

const Clear = styled(Typography)`
  margin-left: 5px;
  cursor: pointer;
`;

interface NetworksListProps {
  networksListItems?: components["schemas"]["APSchema"]["networks"];
  selectedNetworkId?: string;
  setSelectedNetwork: (
    network: components["schemas"]["APSchema"]["networks"][number]
  ) => void;
  networkListLoading: boolean;
  setFilters: (val: Partial<AccessPointsFilters>) => void;
  filterValues: Partial<AccessPointsFilters>;
  handleFiltersClear: () => void;
}

const NetworksList: React.FunctionComponent<NetworksListProps> = ({
  networksListItems,
  selectedNetworkId,
  setSelectedNetwork,
  networkListLoading,
  setFilters,
  filterValues,
  handleFiltersClear,
}) => {
  const { addModal } = useModalManager();
  const onFiltersChange = (nextFilters: Record<string, any>) => {
    setFilters(nextFilters);
  };

  const hasFilters = useMemo(() => {
    return !!Object.values(filterValues ?? []).filter((el) => el !== "").length;
  }, [filterValues]);

  const handleShowFilters = () => {
    addModal(
      <NetworksFilterModal
        onFiltersChange={onFiltersChange}
        filterValues={filterValues}
      />
    );
  };

  const handleAddNetwork = async ({}) => {
    addModal(
      <AddNetworkModal
        accessPointId="test" // TODO
      />
    );
  };

  return (
    <>
      <RightPanelContainer>
        <Header>
          <LabelAndFilterBtn>
            <Typography
              variant={TypographyVariant.HEADER2}
              style={{ color: "#556CB1" }}
            >
              Networks
            </Typography>
            <FilterIconWrapper>
              {hasFilters && <GreenDot />}
              <StyledFilterIcon onClick={handleShowFilters} />
              {hasFilters && (
                <Clear
                  onClick={handleFiltersClear}
                  variant={TypographyVariant.CAPTION}
                >
                  Clear
                </Clear>
              )}
            </FilterIconWrapper>
          </LabelAndFilterBtn>
        </Header>
        <ScrollableArea id="scrollableDiv2">
          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={networksListItems?.length || 0}
            next={() => {}}
            hasMore={false}
            loader={
              <ScrollSpinnerWrapper>
                <Spinner />
              </ScrollSpinnerWrapper>
            }
            scrollableTarget="scrollableDiv2"
          >
            <StyledLoadingBar loading={networkListLoading} />
            <InfiniteScrollContent>
              {networksListItems?.length ? (
                networksListItems?.map((el) => {
                  return (
                    <Fragment key={el.id}>
                      <NetworkCard
                        selected={String(el.id) === selectedNetworkId}
                        onClick={() => {
                          setSelectedNetwork(el);
                        }}
                      >
                        <Label
                          key={String(el.id) + "-label"}
                          variant={TypographyVariant.HEADLINE}
                        >
                          {el.name}
                        </Label>
                      </NetworkCard>
                    </Fragment>
                  );
                })
              ) : (
                <NoNetworks variant={TypographyVariant.HEADLINE}>
                  No networks found
                </NoNetworks>
              )}
            </InfiniteScrollContent>
          </InfiniteScroll>
        </ScrollableArea>
      </RightPanelContainer>
      <Typography
        variant={TypographyVariant.BODY13}
        style={{ textAlign: "right", marginRight: "10px" }}
        onClick={handleAddNetwork}
        color="#24A5EE"
        clickable
        hoverUnderline
      >
        + Add network
      </Typography>
    </>
  );
};
export default NetworksList;
