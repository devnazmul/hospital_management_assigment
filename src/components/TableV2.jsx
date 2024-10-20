// ===========================================
// #00122
// ===========================================

import React, { Fragment, useState } from "react";
import CustomDropDownForTable from "./CustomDropDownForTable";
import CustomLoading from "./CustomLoading";
import ViewTableRow from "./View/ViewTableRow";

const MobileCard = ({
  cols,
  actions,
  data,
  isLoading,
  isFullActionList,
  getFullDataToActionHandler,
}) => (
  <div className="p-5 my-2 rounded-xl bg-base-300 border border-primary-content shadow-md shadow-primary-content flex flex-col overflow-auto scrollbar-none">
    {/* ACTION BUTTONS  */}
    <div className={`w-full flex items-center justify-between pt-1 pb-5`}>
      <h1 className={`font-bold text-xl text-primary`}>Details</h1>

      {actions.filter((action) => {
        return !action.disabledOn.some((disable) => {
          const conditionValue = data[disable.attributeName];
          return conditionValue === disable.value;
        });
      })?.length > 0 ? (
        <td className="text-right p-0">
          {!isFullActionList ? (
            <CustomDropDownForTable
              isDeleteDisabled={data?.is_system_default}
              disabled={selectedIds?.length > 1}
              fullData={rows}
              isDataLoading={isLoading}
              isShareDataLoading={isLoading}
              data={data}
              actions={actions}
            />
          ) : (
            <div className="flex gap-2 justify-end items-center">
              {actions
                .filter((action) => {
                  return !action.disabledOn.some((disable) => {
                    const conditionValue = data[disable.attributeName];
                    return conditionValue === disable.value;
                  });
                })
                .map((action, index) => (
                  <React.Fragment key={index}>
                    {action.permissions ? (
                      <button
                        onClick={() =>
                          action.handler(
                            getFullDataToActionHandler ? data : data?.id
                          )
                        }
                        data-tip={action.name}
                        className={`tooltip tooltip-bottom tooltip-primary`}
                        key={index}
                      >
                        <action.Icon
                          className={`text-xl ${
                            action.name === "delete"
                              ? " text-red-500"
                              : "text-primary"
                          }`}
                        />
                      </button>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                ))}
            </div>
          )}
        </td>
      ) : (
        <></>
      )}
    </div>

    {/* DATA  */}
    <div className={`flex flex-col gap-2`}>
      {cols.map((col, j) => (
        <Fragment key={j}>
          {!!col?.show && (
            <>
              {!!data[col?.attribute_name] && (
                <ViewTableRow
                  title={col.name}
                  value={data[col?.attribute_name]}
                />
              )}
            </>
          )}
        </Fragment>
      ))}
    </div>
    {/* <table  className="table w-full ">
      <tbody >
        {cols.map((col, j) => (
          <Fragment key={j}>
            {col?.show ? (
              <>
                {data[col?.attribute_name] ? (
                  <tr

                    key={j}
                    className={`px-5 border-y border-primary-content w-full`}
                  >
                    <td

                      className={`font-bold border border-primary-content text-primary ${col1Width}`}
                    >
                      {col.name}:
                    </td>
                    <td

                      className={`border border-primary-content overflow-wrap-anywhere ${col2Width}`}
                    >
                      {data[col?.attribute_name]}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </Fragment>
        ))}
      </tbody>
    </table> */}
  </div>
);

export default function TableV2({
  getFullDataToActionHandler = false,
  rows,
  cols,
  isLoading,
  actions = [],
  isFullActionList = true,

  selectedIds,
  setSelectedIds,
  checkBoxes = false,
  header = true,
  tableHeaderClass = "bg-base-100",
  col1Width = "w-[30%]",
  col2Width = "w-[70%]",
  smGrid = "sm:grid-cols-2",
  onlyCard = false,
  dataAuto,
  MobileComponent = ({
    cols,
    actions,
    data,
    isLoading,
    isFullActionList,
    col1Width,
    col2Width,
    getFullDataToActionHandler,
    dataAuto,
  }) => (
    <MobileCard
      cols={cols}
      actions={actions}
      data={data}
      isLoading={isLoading}
      isFullActionList={isFullActionList}
      col1Width={col1Width}
      col2Width={col2Width}
      getFullDataToActionHandler={getFullDataToActionHandler}
      dataAuto={dataAuto}
    />
  ),
}) {
  const [allChecked, setAllChecked] = useState(false);

  const permissions = localStorage.getItem("permissions");

  const handleTickAll = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setSelectedIds(rows.map((d) => parseInt(d.id)));
      setAllChecked(true);
    } else {
      setSelectedIds([]);
      setAllChecked(false);
    }
  };

  const handleTick = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setSelectedIds([...selectedIds, parseInt(value)]);
    } else {
      setSelectedIds(
        selectedIds.filter((single_id) => single_id !== parseInt(value))
      );
      setAllChecked(false);
    }
  };

  const htmlMode = document.documentElement.getAttribute("data-theme");

  if (onlyCard) {
    return (
      <div
        data-auto={`onlyCard-container-${dataAuto}`}
        className={`overflow-x-auto scrollbarX  top-0 w-full bg-base-200 md:bg-base-200 min-h-[300px]`}
      >
        {/* FOR MOBILE VIEW  */}
        <div className={`w-full`}>
          {!isLoading ? (
            rows?.length > 0 ? (
              <div
                className={`grid grid-cols-1 ${smGrid} gap-5 md:gap-0 bg-base-200 `}
              >
                {rows?.map((data, i) => (
                  <MobileComponent
                    key={i}
                    cols={cols}
                    actions={actions}
                    data={data}
                    isLoading={isLoading}
                    isFullActionList={isFullActionList}
                    col1Width={col1Width}
                    col2Width={col2Width}
                    getFullDataToActionHandler={getFullDataToActionHandler}
                    dataAuto={dataAuto}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center flex-col bg-base-200 p-5  rounded-xl">
                <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                  <img
                    className="w-20"
                    src="/assets/nodatafound.svg"
                    alt="no data found"
                  />
                  <div className={`flex justify-center items-center flex-col`}>
                    <h4 className="font-medium text-lg text-center">
                      Nothing Found!
                    </h4>
                    <p className="font-light text-center">
                      Please add a new entity to see the content here. Thank
                      you!
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <CustomLoading h={"h-[40vh]"} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      data-auto={`container-${dataAuto}`}
      className={`overflow-x-auto scrollbarX  top-0 w-full bg-base-100 md:bg-base-200 min-h-[300px]`}
    >
      {/* FOR DESKTOP VIEW  */}
      <table
        data-auto={`desktop-container-${dataAuto}`}
        className="hidden md:table gap-2 rounded-xl "
      >
        {header ? (
          <thead
            data-auto={`head-${dataAuto}`}
            className={`${tableHeaderClass} border-b-2 border-primary-content bg-primary `}
          >
            <tr
              data-auto={`head-row-${dataAuto}`}
              className="h-16 text-base-300 border-b border-primary-content"
            >
              {checkBoxes ? (
                <th
                  style={{
                    width: `1%`,
                  }}
                  className=" px-8"
                >
                  <label>
                    <input
                      data-auto={`head-checkbox-${dataAuto}`}
                      checked={
                        allChecked ||
                        (selectedIds?.length === rows?.length &&
                          selectedIds?.length !== 0)
                      }
                      onClick={handleTickAll}
                      onChange={() => {}}
                      type="checkbox"
                      className={`checkbox checkbox-primary`}
                    />
                  </label>
                </th>
              ) : (
                ""
              )}
              <th
                style={{
                  width: `1%`,
                }}
                className="px-5"
              >
                <div className="flex flex-col items-start justify-start gap-2"></div>
              </th>
              {cols.map((th, i) => (
                <Fragment key={i}>
                  {th?.show ? (
                    <th
                      data-auto={`head-${i + 1}-${dataAuto}`}
                      className={`px-5 ${
                        th?.isMainField ? "table-cell" : "hidden"
                      } md:table-cell`}
                      style={{
                        width: `${th?.minWidth}%`,
                        textAlign: th?.align ? th?.align : `left`,
                      }}
                    >
                      <div
                        className={`flex flex-col text-center  ${
                          th?.align === "center"
                            ? "items-center"
                            : "items-start"
                        }  justify-start gap-2 font-bold text-[16px]`}
                      >
                        {th?.name.slice(0, 1).toUpperCase() + th?.name.slice(1)}{" "}
                      </div>
                    </th>
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}

              {actions?.length > 0 ? (
                <th
                  data-auto={`head-action-${dataAuto}`}
                  style={{
                    minWidth: "1%",
                    paddingRight: "20px",
                  }}
                >
                  <div className="flex items-center justify-end  font-bold text-[16px]">
                    <span>Actions</span>
                  </div>
                </th>
              ) : (
                ""
              )}
            </tr>
          </thead>
        ) : (
          ""
        )}

        <tbody data-auto={`body-${dataAuto}`} className="">
          {!isLoading ? (
            rows && rows?.length > 0 ? (
              rows.map((data, i) => (
                <tr
                  data-auto={`row-${i + 1}-${dataAuto}`}
                  key={i}
                  className={`border-b ${
                    i % 2 === 1 ? "bg-base-200" : "bg-base-300"
                  } border-primary-content  h-16 hover:bg-base-200 text-neutral group tableRowAdmin hover:overflow-hidden`}
                >
                  {checkBoxes ? (
                    <td className="w-[50px] px-8">
                      <label>
                        <input
                          data-auto={`row-checkbox-${i + 1}-${dataAuto}`}
                          checked={allChecked || selectedIds.includes(data.id)}
                          value={data?.id}
                          onClick={handleTick}
                          onChange={() => {}}
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </label>
                    </td>
                  ) : (
                    ""
                  )}
                  <td
                    data-auto={`row-count-${i + 1}-${dataAuto}`}
                    key={i}
                    style={{
                      minWidth: "1%",
                    }}
                    className="px-5"
                  >
                    <span>{i + 1}</span>
                  </td>

                  {cols.map((col, j) => (
                    <Fragment key={j}>
                      {col?.show ? (
                        <td
                          data-auto={`row-${i + 1}-col-${j + 1}-${dataAuto}`}
                          style={{
                            width: `${col?.minWidth}%`,
                          }}
                          key={j}
                          className={`px-5 ${
                            col?.isMainField ? "table-cell" : "hidden"
                          } ${
                            col?.align === "center" && "text-center"
                          } md:table-cell ${
                            col?.wrap ? "overflow-wrap-anywhere" : ""
                          }`}
                        >
                          {data[col?.attribute_name]}
                        </td>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  ))}

                  {actions.filter((action) => {
                    return !action.disabledOn.some((disable) => {
                      const conditionValue = data[disable.attributeName];
                      return conditionValue === disable.value;
                    });
                  })?.length > 0 ? (
                    <td
                      data-auto={`actions-${i + 1}-${dataAuto}`}
                      style={{
                        width: "1%",
                        paddingRight: "20px",
                      }}
                      className="text-right"
                    >
                      {!isFullActionList ? (
                        <CustomDropDownForTable
                          getFullDataToActionHandler={
                            getFullDataToActionHandler
                          }
                          isDeleteDisabled={data?.is_system_default}
                          disabled={selectedIds?.length > 1}
                          fullData={rows}
                          index={i}
                          isDataLoading={isLoading}
                          isShareDataLoading={isLoading}
                          data={data}
                          actions={actions}
                        />
                      ) : (
                        <span className="flex gap-5 justify-end items-center">
                          {actions
                            .filter((action) => {
                              return !action.disabledOn.some((disable) => {
                                const conditionValue =
                                  data[disable.attributeName];
                                return conditionValue === disable.value;
                              });
                            })
                            .slice(0, 3)
                            .map((action, index) => (
                              <Fragment key={index}>
                                {action.permissions ? (
                                  <button
                                    onClick={() =>
                                      action.handler(
                                        getFullDataToActionHandler
                                          ? data
                                          : data?.id
                                      )
                                    }
                                    data-tip={action.name}
                                    className={`tooltip ${
                                      action === actions[actions?.length - 1]
                                        ? "tooltip-left"
                                        : "tooltip-top"
                                    } tooltip-primary`}
                                    key={index}
                                  >
                                    <action.Icon
                                      className={`text-xl ${
                                        action.name === "delete"
                                          ? " text-red-500"
                                          : "text-primary"
                                      }`}
                                    />
                                  </button>
                                ) : (
                                  ""
                                )}
                              </Fragment>
                            ))}

                          {actions.filter((action) => {
                            return !action.disabledOn.some((disable) => {
                              const conditionValue =
                                data[disable.attributeName];
                              return conditionValue === disable.value;
                            });
                          })?.length > 3 ? (
                            <CustomDropDownForTable
                              isDeleteDisabled={data?.is_system_default}
                              disabled={selectedIds?.length > 1}
                              fullData={rows}
                              index={i}
                              isDataLoading={isLoading}
                              isShareDataLoading={isLoading}
                              data={data}
                              actions={actions
                                .filter((action) => {
                                  return !action.disabledOn.some((disable) => {
                                    const conditionValue =
                                      data[disable.attributeName];
                                    return conditionValue === disable.value;
                                  });
                                })
                                .slice(3)}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  data-auto={`no-data-${dataAuto}`}
                  className="text-center py-5 bg-base-200"
                  colSpan={cols?.length + 4}
                >
                  {/* FOR DEFAULT LIGHT THEME  */}
                  <div className="flex justify-center items-center flex-col">
                    <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                      <img
                        className="w-20"
                        src="/assets/nodatafound.svg"
                        alt="no data found"
                      />
                      <div>
                        <h4 className="font-medium text-lg">Nothing Found!</h4>
                        <p className="font-light">
                          Please add a new entity to see the content here. Thank
                          you!
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td className="text-center py-5" colSpan={cols?.length + 4}>
                <span className="loading loading-spinner text-primary loading-lg"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* FOR MOBILE VIEW  */}
      <div className={`w-full block md:hidden `}>
        {!isLoading ? (
          rows?.length > 0 ? (
            <div
              className={`grid grid-cols-1 ${smGrid} gap-5 md:gap-0 bg-base-100 `}
            >
              {rows?.map((data, i) => (
                <MobileComponent
                  key={i}
                  cols={cols}
                  actions={actions}
                  data={data}
                  isLoading={isLoading}
                  isFullActionList={isFullActionList}
                  col1Width={col1Width}
                  col2Width={col2Width}
                  getFullDataToActionHandler={getFullDataToActionHandler}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col bg-base-200 p-5  rounded-xl">
              <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                <img
                  className="w-20"
                  src="/assets/nodatafound.svg"
                  alt="no data found"
                />
                <div className={`flex justify-center items-center flex-col`}>
                  <h4 className="font-medium text-lg text-center">
                    Nothing Found!
                  </h4>
                  <p className="font-light text-center">
                    Please add a new entity to see the content here. Thank you!
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <CustomLoading h={"h-[40vh]"} />
        )}
      </div>
    </div>
  );
}
