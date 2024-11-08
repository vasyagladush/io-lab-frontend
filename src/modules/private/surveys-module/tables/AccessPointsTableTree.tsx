/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import {
  PaginationControl,
  ReactTableComponent,
} from "../../../../components/ui-kit";
import { ExpandableAccessPointAndNetworksTreeCell } from "./components/ExpandableAccessPointAndNetworksTreeCell";
import { useNavigate } from "react-router-dom";
import { useDialogManager } from "../../../../context/DialogManager";
import { NavigationAppRoutes } from "../../../../constants/navigation-routes";
import { AccessPointsFilters } from "../surveys/access-points-list/hooks/useAccessPointsList";
import { components } from "../../../../util/backend-api-types";
import { AccessPointTypeForTables } from "../../../../util/types";

type AccessPointApiType = components["schemas"]["APSchema"];

const Wrapper = styled.div``;

const StyledReactTableComponent = styled(ReactTableComponent)<{
  alwaysExpandedTable?: boolean;
}>`
  thead {
    tr {
      th {
        :first-child {
          padding-right: 10px;
          margin-right: -20px;
        }
        :nth-child(2) {
          padding-left: 0;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        :first-child {
          padding-left: 5px;
          padding-right: 0;
        }
        :nth-child(2) {
          padding-left: 0;
        }
      }
    }
  }
`;

interface AccessPointsTableTreeProps {
  data: Array<AccessPointTypeForTables>;
  pagination: PaginationControl;
  className?: string;
  loading?: boolean;
  refreshAccessPoints: () => void;
  hideRowPerPageAction?: boolean;
  appliedFilters?: AccessPointsFilters;
}

export const AccessPointsTableTree: React.FunctionComponent<
  AccessPointsTableTreeProps
> = ({
  data,
  className,
  loading,
  refreshAccessPoints,
  pagination,
  hideRowPerPageAction,
  appliedFilters,
}) => {
  const navigate = useNavigate();
  const { showDialog } = useDialogManager();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Handlers
  const onEditClick =
    (
      item:
        | AccessPointTypeForTables["subRows"][number]
        | AccessPointTypeForTables
    ) =>
    () => {
      if ("parent" in item) {
        navigate(
          NavigationAppRoutes.Private.AccessPoints.AP_EDIT + "/" + item.parent.id,
          {
            state: {
              networkId: item.id,
              filters: appliedFilters,
            },
          }
        );
      } else {
        navigate(NavigationAppRoutes.Private.AccessPoints.AP_EDIT + "/" + item.id, {
          state: {
            filters: appliedFilters,
          },
        });
      }
    };

  const handleActionClick = (menuId: string | null) => {
    setOpenMenuId(menuId);
  };
  // END Handlers

  const columns: Array<ColumnDef<AccessPointTypeForTables>> = [
    {
      header: "Access Point",
      accessorKey: "accessPoint",
      enableSorting: false,
      cell: ({
        row: { original, depth, getToggleExpandedHandler, getIsExpanded },
      }) => {
        return (
          <ExpandableAccessPointAndNetworksTreeCell
            name={original.name}
            networksLength={original.subRows?.length}
            handleClick={getToggleExpandedHandler()}
            isExpanded={getIsExpanded()}
            depth={depth}
            onNameClick={onEditClick(original)}
          />
        );
      },
    },
    {
      header: "Device ID",
      accessorKey: "deviceId",
      enableSorting: false,
      cell: ({ row: { original } }) => {
        return original.deviceId;
      },
    },
    {
      header: "IP Address",
      accessorKey: "ip",
      enableSorting: false,
      cell: ({ row: { original } }) => {
        return original.ip;
      },
    },
    // {
    //   header: "",
    //   id: "actions",
    //   cell: ({ row: { original, depth } }) => {
    //     const network = getNetworkFromTableRowData(original);
    //     return (
    //       <Actions
    //         externalUniqueId={
    //           depth === 0 ? String(original.id) : String(network!.id)
    //         }
    //         externalOpenState={
    //           openMenuId ===
    //           (depth === 0 ? String(original.id) : String(network!.id))
    //         }
    //         externalOpenAction={handleActionClick}
    //         actions={[
    //           {
    //             label: "Edit",
    //             onClick: onEditClick(original),
    //           },
    //         ]}
    //       />
    //     );
    //   },
    // },
  ];
  return (
    <Wrapper className={className}>
      <StyledReactTableComponent
        padding="9px 15px"
        withPagination={pagination}
        columns={columns}
        // columnVisibility={{
        // }}
        data={data}
        loading={loading}
        accessPointWithNetworksTable
        // alwaysExpandedTable={}
        hideRowPerPageAction={hideRowPerPageAction}
        appliedAccessPointsFilters={appliedFilters}
      />
    </Wrapper>
  );
};
