import * as React from 'react';
import styles from './SowProcedure.module.scss';
import { ISowProcedureProps } from './ISowProcedureProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPComponentLoader } from '@microsoft/sp-loader';
import { sp, Web, Item } from '@pnp/sp';
import { CurrentUser } from '@pnp/sp/src/siteusers';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import { RichText } from '@pnp/spfx-controls-react/lib/RichText';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import Popup from "reactjs-popup";
import Multiselect from 'multiselect-dropdown-react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import Modal from 'react-modal';

import * as $ from 'jquery';
import { values } from 'office-ui-fabric-react/lib/Utilities';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Steps } from './Steps.js';

require('bootstrap');
require('../css/test.css');
require('../css/custom.css');

SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');
SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

SPComponentLoader.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');
SPComponentLoader.loadScript('https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.jquery.min.js');
SPComponentLoader.loadCss('https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.min.css');

var ipaddress;
let steps: Steps[] = [];

const stepImages = [
  {
    imageUrl: require('../img/Rules_of_Task_Planning.jpg') as string,
    label: 'Rules of Task Planning',
    id: 'IdRuleCheckBox'
  },
  {
    imageUrl: require('../img/Risk_Assessment.jpg') as string,
    label: 'Risk Assessment',
    id: 'IdRiskCheckBox'
  },
  {
    imageUrl: require('../img/Barrier_Management.jpg') as string,
    label: 'Barrier Management',
    id: 'IdBarrierCheckBox'
  },
  {
    imageUrl: require('../img/Permit_to_Work.jpg') as string,
    label: 'Permit to Work',
    id: 'IdPermitCheckBox'
  },
  {
    imageUrl: require('../img/Restricted_Access.jpg') as string,
    label: 'Restricted Access',
    id: 'IdRestrictedCheckBox'
  },
  {
    imageUrl: require('../img/START_Conversations.jpg') as string,
    label: 'Start Conversations',
    id: 'IdStartCheckBox'
  },
  {
    imageUrl: require('../img/Time_out_for_Safety.jpg') as string,
    label: 'Time out for Safety',
    id: 'IdTimeCheckBox'
  },
];

const newPositionImage = [
  {
    imageUrlCaution: require('../img/risk_d.png') as string,
    imageUrlNotes: require('../img/info.png') as string
  },
];

export default class SowProcedure extends React.Component<ISowProcedureProps, {}> {

  public state = {
    selectedUsers: [],
    selectedDate: undefined,
    options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
    modal: false,
    description: "",
    modalInputName: ""
  };


  public result(params) {
    console.log(params);
  }

  public render(): React.ReactElement<ISowProcedureProps> {
    return (
      <div id="container">
        <form id="frm">
          <div className="row">

            <div className="col col-lg-3">
              <img src={require('../img/Transocean_Logo.png')} width="100" />
            </div>
            <div className="col col-lg-9">
              <h2>Scope of Work Procedure Pack Document</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">

              <div className="panel panel-primary">

                <div className="panel-heading">
                  1. SOW Code
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="txtTitle" id="title" className="form-control" rows={1} placeholder="SOW Title" readOnly />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  2. SOW Title
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="txtTitle" id="title" className="form-control" rows={1} placeholder="SOW Title" readOnly />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  3. Task
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="txtTitle" id="title" className="form-control" rows={5} placeholder="Task" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  4. Status
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <select id="Status" className="form-control">
                        <option value="open">Open</option>
                        <option value="work in progress">Work In Progress</option>
                        <option value="Approved">Approved</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />

                {/* <div className="row">
            <div className="col-lg-4 text-right">
              <label>PIC</label>
            </div>
            <div className="col-lg-8">
              <PeoplePicker
                context={this.props.context}
                titleText="People Picker"
                personSelectionLimit={1}
                defaultSelectedUsers={this.state.selectedUsers}
                showtooltip={true}
                isRequired={false}
                disabled={false}
               // selectedItems={this.getPeoplePickerItems}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000} />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-lg-4 text-right">
              <label>Date</label>
            </div>
            <div className="col-lg-8">
              <DateTimePicker
                dateConvention={DateConvention.Date}
                timeConvention={TimeConvention.Hours24}
                //onChange={this.handleChange}
              />
            </div>
          </div>
          <br /> */}
                <div className="panel-heading">
                  5. Planning
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="planning" id="planning" className="form-control" rows={5} placeholder="Planning" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  6. General Information
                </div>
                <br />
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any requirements or actions to be recorded here i.e. Weights, safety system, vessel general knowledge to have standardization among crews.</b></p>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="generalInfo" id="generalInfo" className="form-control" rows={5} placeholder="General Information" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  7. Inspect the Equipment
                </div>
                <br />
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any equipment or tools require to perforn the task will be entered here. This doesn't include Planned Maintainance.</b></p>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="inspectEquip" id="inspectEquip" className="form-control" rows={5} placeholder="Inspect the Equipment" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  8. Additional Tools Required to Complete Job
                </div>
                <br />
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inventory of tools required to ensure no road blocks are encountered and efficiency is increased.</b></p>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="additionalTool" id="additionalTool" className="form-control" rows={5} placeholder="Additional Tools Required to Complete Job" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel panel-primary">
                  <div className="panel-heading">
                    9. Roles and Responsibilties
                  </div>
                  <br />
                  <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each position has a role to play and accountability to perform that action has been executed.</b></p>
                  <div className="panel-body">
                    <div className="row top-buff">
                      <div className="col-lg-1 control-padding">
                        <label>Item</label>
                      </div>
                      <div className="col-lg-2  control-padding">
                        <label>Position</label>
                      </div>
                      <div className="col-lg-2  control-padding">
                        <label>Class</label>
                      </div>
                      <div className="col-lg-3 control-padding">
                        <label>Work to be Performed</label>
                      </div>
                      <div className="col-lg-3 control-padding">
                        <label>Requirement</label>
                      </div>
                    </div>
                    <div id="SectionRoles">

                    </div>
                  </div>
                  <div className="panel-footer top-buff">
                    <button type="button" className="btn btn-primary buttons" id="btnAddRow" onClick={() => this.AddSectionRolesandResponsibilty()}>Add</button>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  10. ToolBox Talk
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="toolBox" id="toolBox" className="form-control" rows={5} placeholder="ToolBox Talk" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  11. Operations Integrity and HSE Resources
                </div>
                <br />
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List Name of Corporate / OEM documentation requirements that are require to be referenced to assist in proper control and mitigation, reviews or updates for task being performed.</b></p>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="operationHSE" id="operationHSE" className="form-control" rows={5} placeholder="Operations Integrity and HSE Resources" />
                    </div>
                  </div>
                </div>
                <br />

                {/*                 <div className="panel-heading">
                  17. Life Saving Tools
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                    <select id="Status">
                        <option value="Select any">Select</option>
                        <option value="Rules of Task Planning">Rules of Task Planning</option>
                        <option value="Risk Assessment">Risk Assessment</option>
                        <option value="Barrier Management">Barrier Management</option>
                        <option value="Permit to Work">Permit to Work</option>
                        <option value="Restricted Access">Restricted Access</option>
                        <option value="START Conversations">START Conversations</option>
                        <option value="Time out for Safety">Time out for Safety</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  18. Step Description
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="txtTitle" id="title" className="form-control" rows={5} placeholder="Step Description" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  19. Caution Text
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <textarea name="txtTitle" id="title" className="form-control" rows={5} placeholder="Caution Text" />
                    </div>
                  </div>
                </div>
                <br />

                <div className="panel-heading">
                  20. PIC
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <PeoplePicker
                        context={this.props.context}
                        personSelectionLimit={1}
                        defaultSelectedUsers={this.state.selectedUsers}
                        showtooltip={true}
                        isRequired={false}
                        disabled={false}
                        // selectedItems={this.getPeoplePickerItems}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                    </div>
                  </div>
                </div>
                <br /> */}

                {/* <div className="panel-heading">
                  14. PIC
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <PeoplePicker
                        context={this.props.context}
                        personSelectionLimit={1}
                        defaultSelectedUsers={this.state.selectedUsers}
                        showtooltip={true}
                        isRequired={false}
                        disabled={false}
                        // selectedItems={this.getPeoplePickerItems}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                    </div>
                  </div>
                </div>
                <br /> */}

                {/*  <div className="panel panel-primary">
                  <div className="panel-heading">
                    12. Rig Procedure
                  </div>
                  <div className="panel-body">
                    <div className="row top-buff">
                      <div className="col-lg-12 imgBorder">
                      <img src = {require('../img/Rules_of_Task_Planning.jpg')} width="20"></img><label>Rules of Task Planning&nbsp;&nbsp;</label>
                      <img src = {require('../img/Risk_Assessment.jpg')} width="20"></img><label>Risk Assessment&nbsp;&nbsp;</label>
                      <img src = {require('../img/Barrier_Management.jpg')} width="20"></img><label>Barrier Management&nbsp;&nbsp;</label>
                      <img src = {require('../img/Permit_to_Work.jpg')} width="20"></img><label>Permit to Work&nbsp;&nbsp;</label>
                      <br />
                      <br />
                      <img src = {require('../img/Restricted_Access.jpg')} width="20"></img><label>Restricted Access&nbsp;&nbsp;</label>
                      &nbsp;&nbsp;&nbsp;&nbsp;<img src = {require('../img/START_Conversations.jpg')} width="20"></img><label>START Conversations&nbsp;&nbsp;</label>
                      <img src = {require('../img/Time_out_for_Safety.jpg')} width="20"></img><label>Time out for Safety</label>
                      <br />
                      </div>
                      <div className="col-lg-1 control-padding">
                        <label>Item</label>
                      </div>
                      <div className="col-lg-1  control-padding">
                        <label>Life Saving Tools</label>
                      </div>
                      <div className="col-lg-4  control-padding">
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Steps Description</label>
                      </div>
                      <br />
                      <br />
                      <div className="col-lg-2 control-padding">
                        <label>Caution Text</label>
                      </div>
                      <div className="col-lg-2 control-padding">
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Position</label>
                      </div>
                    </div>
                    <div id="SectionF">

                    </div>
                  </div>
                  <div className="panel-footer top-buff">
                    <button type="button" className="btn btn-primary buttons" id="btnAddRow" onClick={() => this.AddSection()}>Add</button>
                  </div>
                </div> */}
                {/*  <Popup trigger={<button> Trigger </button>} position="right center">
    <div>Popup content here !!</div>
  </Popup> */}

              </div>
            </div>
          </div>



          {/*         <div className="row">
            <div className="col-lg-12">

              <div className="panel panel-primary">
                <div className="panel-heading">
                  RIG Procedure
                </div>
                <div className="panel-body">
          <div className="row">
            <div className="col-lg-8 text-left">
              <label>Life Saving Tools</label>
            </div>
            <div className="col-lg-8">
              <textarea name="txtTitle" id="title" className="form-control"  rows={3} /> 
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-lg-8 text-left">
              <label>Step Description</label>
            </div>
            <div className="col-lg-12">
              <textarea name="txtTitle" id="title" className="form-control"  rows={3} /> 
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-lg-8 text-left">
              <label>Caution Text</label>
            </div>
            <div className="col-lg-8">
              <textarea name="txtTitle" id="title" className="form-control"  rows={3} placeholder="Caution Text"/> 
            </div>
          </div>
          <br />
          
          <div className="row">
            <div className="col-lg-8 text-left">
              <label>PIC</label>
            </div>
            <div className="col-lg-8">
              <PeoplePicker
                context={this.props.context}
                personSelectionLimit={1}
                defaultSelectedUsers={this.state.selectedUsers}
                showtooltip={true}
                isRequired={false}
                disabled={false}
               // selectedItems={this.getPeoplePickerItems}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000} />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-lg-8 text-left">
              <label>Status</label>
            </div>
            <div className="col-lg-8">
              <select id="Status">
                <option value="open">Open</option>
                <option value="work in progress">Work In Progress</option>
                <option value="Approved">Approved</option>
              </select>

            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-lg-4 text-right">
              <label>PIC</label>
            </div>
            <div className="col-lg-8">
              <PeoplePicker
                context={this.props.context}
                titleText="People Picker"
                personSelectionLimit={1}
                defaultSelectedUsers={this.state.selectedUsers}
                showtooltip={true}
                isRequired={false}
                disabled={false}
               // selectedItems={this.getPeoplePickerItems}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000} />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-lg-4 text-right">
              <label>Date</label>
            </div>
            <div className="col-lg-8">
              <DateTimePicker
                dateConvention={DateConvention.Date}
                timeConvention={TimeConvention.Hours24}
                //onChange={this.handleChange}
              />
            </div>
          </div>
          <br />
          </div>
          </div>
          </div>
          </div>  */}

          <div className="panel panel-primary">
            <div className="panel-heading">
              12. Rig Procedure Modallayout
                  </div>
            <div className="panel-body">
              <div className="row top-buff">

                <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                  Add Steps
                </button>

                <br />
                <div className="panel-body">
                  <div className="row top-buff">
                    <div className="col-lg-1 control-padding">
                      <label>Item</label>
                    </div>
                    <div className="col-lg-8  control-padding">
                      <label>Position/Description</label>
                    </div>
                    {/* <div className="col-lg-6  control-padding">
                        <label>Description</label>
                      </div> */}
                    <div className="col-lg-2 control-padding">
                      <label>Image</label>
                    </div>
                  </div>

                  <div id="SectionPositionparent">

                  </div>
                </div>

                <div className="col-lg-12 imgBorder">
                  <div className="col-lg-12">
                    <div className="col-lg-3">
                      <img src={require('../img/Rules_of_Task_Planning.jpg')} width="20"></img><label>Rules of Task Planning</label>
                    </div>
                    <div className="col-lg-3">
                      <img src={require('../img/Risk_Assessment.jpg')} width="20"></img><label>Risk Assessment</label>
                    </div>
                    <div className="col-lg-3">
                      <img src={require('../img/Barrier_Management.jpg')} width="20"></img><label>Barrier Management</label>
                    </div>
                    <div className="col-lg-3">
                      <img src={require('../img/Permit_to_Work.jpg')} width="20"></img><label>Permit to Work</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="col-lg-3">
                      <img src={require('../img/Restricted_Access.jpg')} width="20"></img><label>Restricted Access</label>
                    </div>
                    <div className="col-lg-3">
                      <img src={require('../img/START_Conversations.jpg')} width="20"></img><label>START Conversations</label>
                    </div>
                    <div className="col-lg-3">
                      <img src={require('../img/Time_out_for_Safety.jpg')} width="20"></img><label>Time out for Safety</label>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="col-lg-12 top">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title centerAddProc" id="myModalLabel">Add Procedure</h4>
                        </div>
                        <div className="col-lg-12">
                        <h4 className="modal-title step" id="myModalLabel"><b>STEP</b></h4>
                        </div>
                      </div>
                      <div className="modal-body" id="lifeSaving">
                        {/* <label id="teste">Life Saving Tools</label>
                      <Multiselect options={data1} onSelectOptions={this.result} /> */}

                        <div className="row top-buff border">
                          <div className="col-lg-12 ">
                            <div className="col-lg-3">
                              <input type="checkbox" className="custom-control-input" id={stepImages[0].id} name="lifeSavingTools"></input>
                              <img src={stepImages[0].imageUrl} width="30"></img><label className="fontSize">{stepImages[0].label}</label>
                            </div>
                            <div className="col-lg-3">
                              <input type="checkbox" className="custom-control-input" id="defaultUncheckedRA" name="lifeSavingTools"></input>
                              <img src={stepImages[1].imageUrl} width="30"></img><label className="fontSize">{stepImages[1].label}</label>
                            </div>
                            <div className="col-lg-3">
                              <input type="checkbox" className="custom-control-input" id="defaultUncheckedBM" name="lifeSavingTools"></input>
                              <img src={stepImages[2].imageUrl} width="30"></img><label className="fontSize">{stepImages[2].label}</label>
                            </div>
                            <div className="col-lg-3">
                              <input type="checkbox" className="custom-control-input" id="defaultUncheckedPW" name="lifeSavingTools"></input>
                              <img src={stepImages[3].imageUrl} width="30"></img><label className="fontSize">{stepImages[3].label}</label>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="col-lg-3">
                              <input type="checkbox" className="custom-control-input" id="defaultUncheckedRAc" name="lifeSavingTools"></input>
                              <img src={stepImages[4].imageUrl} width="30"></img><label className="fontSize">{stepImages[4].label}</label>
                            </div>
                            <div className="col-lg-3">
                              <input type="checkbox" className="custom-control-input" id="defaultUncheckedSC" name="lifeSavingTools"></input>
                              <img src={stepImages[5].imageUrl} width="30"></img><label className="fontSize">{stepImages[5].label}</label>
                            </div>
                            <div className="col-lg-3">
                              <input type="checkbox" className="custom-control-input" id="defaultUncheckedTOS" name="lifeSavingTools"></input>
                              <img src={stepImages[6].imageUrl} width="30"></img><label className="fontSize">{stepImages[6].label}</label>
                            </div>
                          </div>
                        </div>

                        <div className="border bgColor row" id="repeatThis">
                          <div className="middlediv">
                            <div className="row top-buff marginTop">
                              <div className="col-lg-4 selectDropdown">
                                <select className="form-control" id="PositionDescid" name="PositionDesc">
                                  <option value="Select">Select</option>
                                  <option value="Master/OIM">Master/OIM</option>
                                  <option value="Mechanic">Mechanic</option>
                                  <option value="ToolPusher">ToolPusher</option>
                                  <option value="Assistant Driller">Assistant Driller</option>
                                </select>
                              </div >
                              <div className="col-lg-8 desc">
                                <textarea id="txtdesc" name="DescriptionPosition" className="form-control " placeholder="Enter Desciption Here"></textarea>
                              </div>
                            </div>

                            <br />
                            <div className="row top-buff btnCaution">
                              <div className="col-lg-9">
                                <div id="btn">
                                  <button type="button" name="caution" className="btn tabcontent" id="btnCaution" onClick={() => this.myFunction()}><img src={require('../img/risk_d.png')} height="15" width="15" />CAUTION</button>
                                  <button type="button" name="warning" className="btn btnWarningColor tabcontent" id="btnWarning" onClick={() => this.warningDesc()}>WARNING</button>
                                  <button type="button" name="note" className="btn tabcontent" id="btnNote" onClick={() => this.notesDesc()}><img src={require('../img/info.png')} height="15" width="15" />NOTE</button>
                                </div>
                              </div>
                              <div className="col-lg-3 positionSave">
                                <button type="button" className="btn btn-primary paddingSaveSubstep"><img src={require('../img/Save_Icon.png')} height="15" width="15"/>SAVE</button>
                              </div>
                            </div>

                            <div className="row selectDesc top-buff">
                              <div className="col-lg-9 selecDescMargin">
                                <div id="caution" className="tabContent">
                                  <textarea id="txtdesc" className="form-control " placeholder="Enter Desciption Here"></textarea>
                                </div>
                                <div id="warning" className="tabContent">
                                  <textarea id="txtdesc1" className="form-control " placeholder="Enter Desciption Here"></textarea>
                                </div>
                                <div id="notes" className="tabContent">
                                  <textarea id="txtdesc2" className="form-control " placeholder="Enter Desciption Here"></textarea>
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <button type="button" className="btn btn-success marg" id="bb" onClick={() => this.AddSectionPosition()}><img src={require('../img/plus.png')} height="15" width="15" />ADD</button>
                                {/* <button type="button"  name="delete" className="btn btn-primary delete"  id ="btndisp" onClick={() => this.DeleteSectionPosition()}>DELETE</button> */}
                                {/* <input type="reset" className="delete btn btnResetColor" value="RESET" /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <br />
                      <button type="button" className="btn btn-primary buttons" id="btnAddRow" onClick={() => this.AddSection()}>Add</button> */}
                        <div id="SectionRig">

                        </div>

                      </div>

                      <div className="footers ">
                        <div className="imagediv">
                          <div className="row top-buff">
                            <div className="col-lg-12 custom-file delete">
                              <div className="col-lg-4 paddingLeftAttach">
                              <input type="textbox" name="attachment" value="" disabled></input>
                              </div>
                              <div className="col-lg-8"> 
                              <input type="file" className="custom-file-input" id="customFile"></input>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                          <button type="button" id="modal" className="btn btn-primary" onClick={() => this.AddtoParent()} data-toggle="modal" data-target="#myModalList" data-dismiss="modal" >Save</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </form>
      </div>
    );
  }
  public DeleteSectionPosition(): void {
    var desc: HTMLInputElement = document.getElementsByName('DescriptionPosition') as unknown as HTMLInputElement;
    var positions: HTMLInputElement = document.getElementsByName('PositionDesc') as unknown as HTMLInputElement;
    var caution: HTMLInputElement = document.getElementsByName('caution') as unknown as HTMLInputElement;
    var warning: HTMLInputElement = document.getElementsByName('warning') as unknown as HTMLInputElement;
    var notes: HTMLInputElement = document.getElementsByName('note') as unknown as HTMLInputElement;

    desc.value = "";
  }


  public myFunction(): void {
    var x = document.getElementById("myDIV");
    var y = document.getElementById("myDIV1");
    var z = document.getElementById("myDIV2");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
      z.style.display = "none ";
    } else {
      x.style.display = "none";
    }
  }

  public warningDesc(): void {
    var x = document.getElementById("myDIV1");
    var y = document.getElementById("myDIV");
    var z = document.getElementById("myDIV2");
    if (x.style.display == "none") {
      x.style.display = "block";
      y.style.display = " none";
      z.style.display = " none";
    } else {
      x.style.display = "none";
    }
  }

  public notesDesc(): void {
    var x = document.getElementById("myDIV2");
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  private AddtoParent(): boolean {

    var SectionDivRigProcedure = $(document.createElement('div'));
    var checked = false;

    var lifeSavingTools: HTMLInputElement[] = document.getElementsByName("lifeSavingTools") as unknown as HTMLInputElement[];
    var desc: HTMLInputElement[] = document.getElementsByName('DescriptionPosition') as unknown as HTMLInputElement[];
    var positions: HTMLInputElement[] = document.getElementsByName('PositionDesc') as unknown as HTMLInputElement[];
    var caution: HTMLInputElement[] = document.getElementsByName('caution') as unknown as HTMLInputElement[];
    var warning: HTMLInputElement[] = document.getElementsByName('warning') as unknown as HTMLInputElement[];
    var notes: HTMLInputElement[] = document.getElementsByName('note') as unknown as HTMLInputElement[];
    let lifeSavingRules: string[] = [];
    let positionMultiple: string[] = [];
    let descriptionvalues: string[] = [];
    let cautionValues: string[] = [];
    let warningValues: string[] = [];
    for (var l = 0; l < lifeSavingTools.length; l++) {
      if (lifeSavingTools[l].checked) {
        lifeSavingRules.push(stepImages[l].id);
      }
    }
    for (var i = 0; i < desc.length; i++) {
      positionMultiple.push(positions[i].value);
      descriptionvalues.push(desc[i].value);
      cautionValues.push(caution[i].value);
      warningValues.push(warning[i].value);
    }

    var stepObject = new Steps(lifeSavingRules, positionMultiple, descriptionvalues, cautionValues, warningValues);
    steps.push(stepObject);
    var stepLifeSavingRules = stepObject.lifeSavingTools as string[];
    var stepDescriptions = stepObject.description as string[];

    var innerHtml = '';
    var descriptionHtml = '';
    for (var m = 0; m < stepLifeSavingRules.length; m++) {
      innerHtml += '<img src=' + getStepConstantFromId(stepLifeSavingRules[m]) + ' height="25" width="25"/><br/>';
    }
    for (var n = 0; n < stepDescriptions.length; n++) {
      descriptionHtml += '<div class="col-lg-8 control-padding"><label>' + stepObject.position[n] + ': ' + stepObject.description[n] + '<br /><img src=' + newPositionImage[0].imageUrlCaution + ' height="15" width="15"/>' + stepObject.caution[n] + '<br />' + stepObject.warning[n] + '</label></div>';
    }
    SectionDivRigProcedure.after().html('<div class="row top-buff" style="margin-top: 5px;">' +
      '<div class="col-lg-1 control-padding"><input type="textbox" name="Item[]" class="form-control" readonly value="">' + innerHtml + '</div>' + descriptionHtml +
      '<div class="col-lg-2 control-padding"></div>' +
      '<div class="col-lg-1"><a href="javascript:void(0);" class="remove_field btn btn-danger" title="Remove Row">X</div>' +
      '</div>');
    SectionDivRigProcedure.appendTo("#SectionPositionparent");
    updateItem();

    $("#SectionPositionparent").on("click", ".remove_field", function (e) {
      e.preventDefault();
      $(this).parent('div').parent('div').parent('div').remove();
      updateItem();
    });

    function updateItem() {
      var inp: HTMLInputElement[] = document.getElementsByName('Item[]') as unknown as HTMLInputElement[];

      for (var j = 0; j < inp.length; j++) {
        inp[j].value = (j + 1).toString();
      }
    }

    function getStepConstantFromId(id: string): string {
      for (var constantIndex = 0; constantIndex < stepImages.length; constantIndex++) {
        if (stepImages[constantIndex].id == id) {
          return stepImages[constantIndex].imageUrl;
        }
      }
      return "";
    }
    return checked;
  }

  //Dynamic functionality - AddSection RigProcedure
  public AddSectionPosition(): void {
    var SectionDiv = $(document.createElement('div'));

    SectionDiv.after().html('<div id="Position" class="row top-buff bgColor paddingMarginAdd border" style="margin-top: 5px;">' +
      // '<div class="col-lg-1 control-padding"><input type="textbox" name="Item[]" class="form-control" readonly value="" ></div>'+

      '<div class="col-lg-4 control-padding"><select id="PositionDescid" name="PositionDesc" class="form-control"><option value="Select any">Select</option>' +
      '<option value="Master/OIM">Master/OIM</option>' +
      '<option value="Mechanic">Mechanic</option>' +
      '<option value="ToolPusher">ToolPusher</option>' +
      '<option value="Assistant Driller">Assistant Driller</option>' +
      '</select></div>' +
      '<div class="col-lg-8 control-padding"><textarea type="text" type="textbox" name="DescriptionPosition" class="form-control" placeholder="Enter Desciption Here" value="" required/></div>' +
      '<br /><br /> <br /> <br />' +
      '<div class="col-lg-9"><button type="button" name="caution" className="btn" id="btnCaution" onClick="myFunction()"><img src=' + newPositionImage[0].imageUrlCaution + ' height="15" width="15"/>CAUTION</button><button type="button" name="warning" className="btn btnWarningColor" id="btnWarning">WARNING</button><button type="button" name="note" className="btn" id="btnNotes"><img src=' + newPositionImage[0].imageUrlNotes + ' height="15" width="15"/>NOTES</button></div>' +
      '<div class="col-lg-3 control-padding"></div>' +
      '<br /> <br />' +
      '<div class="col-lg-9 control-padding"><textarea type="text" type="textbox" name="DescriptionCWN[]" class="form-control" placeholder="Enter Desciption Here" value="" required/></div>' +
      '</div>');
    SectionDiv.appendTo("#SectionRig");
    updateItem();
    $("#SectionRig").on("click", ".remove_field", function (e) {
      e.preventDefault();
      $(this).parent('div').parent('div').parent('div').remove();
      updateItem();
    });

    // tslint:disable-next-line: no-function-expression
    $(('button')).each(function () {
      /* var x = document.getElementById("myDIV1");
      var y = document.getElementById("myDIV");
      var z = document.getElementById("myDIV2");
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = " none";
        z.style.display = " none";
      } else {
        x.style.display = "none";
      } */
    });

    $(('textarea')).each(function () {

      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');

    }).on('input', function () {

      this.style.height = 'auto';

      this.style.height = (this.scrollHeight) + 'px';

    });

    function updateItem() {
      var inps: HTMLInputElement[] = document.getElementsByName('Item[]') as unknown as HTMLInputElement[];

      for (var i = 0; i < inps.length; i++) {
        inps[i].value = (i + 1).toString();
      }
    }
  }


  //Dynamic functionality - AddSection RigProcedure
  private AddSection(): void {
    var SectionDiv = $(document.createElement('div'));

    SectionDiv.after().html('<div class="row top-buff" style="margin-top: 5px;">' +
      // '<div class="col-lg-1 control-padding"><input type="textbox" name="Item[]" class="form-control" readonly value="" ></div>'+
      /* '<div class="col-lg-2 control-padding"><select data-placeholder="Begin typing a name to filter..." multiple class="chosen-select" id="LifeSaving" class="form-control"><option value="Select any">Select</option>'+
      '<option value="Rules of Task Planning">Rules of Task Planning</option>'+
      '<option value="Risk Assessment">Risk Assessment</option>'+
      '<option value="Barrier Management">Barrier Management</option>'+
      '<option value="Permit to Work">Permit to Work</option>'+
      '<option value="Restricted Access">Restricted Access</option>'+
      '<option value="START Conversations">START Conversations</option>'+
      '<option value="Time out for Safety">Time out for Safety</option>'+
      '</select></div>'+ */

      //'<div class="col-lg-3 control-padding"><input type="textbox" name="Custom Text[]" class="form-control" value="" required></div>'+
      //'<div class="col-lg-2 control-padding"><input type="textbox" name="PIC[]" class="form-control" value=""required></div>'+
      /* '<div class="col-lg-2 control-padding"><select id="Status" class="form-control"><option value="Select any">Select</option>'+
      '<option value="Master/OIM">Master/OIM</option>'+
      '<option value="Mechanic">Mechanic</option>'+
      '<option value="ToolPusher">ToolPusher</option>'+
      '<option value="Assistant Driller">Assistant Driller</option>'+
      '</select></div>'+ */
      '<div class="col-lg-3 control-padding"><input type="textbox" name="Caution[]" class="form-control" value="" required></div>' +
      '<div class="col-lg-3 control-padding"><input type="textbox" name="Warning[]" class="form-control" value="" required></div>' +
      '<INPUT TYPE="file" NAME="attachedfile" MAXLENGTH=50 ALLOW="image/*" >' +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<br />' +
      /* '<div class="col-lg-2 control-padding"><PeoplePicker context={this.props.context}'+
      'titleText="People Picker"'+
      'personSelectionLimit={1}'+
      'defaultSelectedUsers={this.state.selectedUsers}'+
      'showtooltip={true}'+
      'isRequired={false}'+
      'disabled={false}'+
      'showHiddenInUI={false}'+
      'principalTypes={[PrincipalType.User]}'+
      'resolveDelay={1000} /></div>'+ */
      '<div class="col-lg-1"><a href="javascript:void(0);" class="remove_field btn btn-danger" title="Remove Row">X</div>' +
      '</div>');
    SectionDiv.appendTo("#SectionRig");
    updateItem();
    $("#SectionRig").on("click", ".remove_field", function (e) {
      e.preventDefault();
      $(this).parent('div').parent('div').parent('div').remove();
      updateItem();
    });
    $(('textarea')).each(function () {

      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');

    }).on('input', function () {

      this.style.height = 'auto';

      this.style.height = (this.scrollHeight) + 'px';

    });

    function updateItem() {
      var inps: HTMLInputElement[] = document.getElementsByName('Item[]') as unknown as HTMLInputElement[];

      for (var i = 0; i < inps.length; i++) {
        inps[i].value = (i + 1).toString();
      }
    }
  }

  //Dynamic functionality - Add
  private AddSectionRolesandResponsibilty(): void {
    var SectionDiv = $(document.createElement('div'));

    SectionDiv.after().html('<div class="row top-buff" style="margin-top: 5px;">' +
      '<div class="col-lg-1 control-padding"><input type="textbox" name="Item[]" class="form-control" readonly value="" ></div>' +
      '<div class="col-lg-2 control-padding"><select id="Status" class="form-control"><option value="Select any">Select</option>' +
      '<option value="Master/OIM">Master/OIM</option>' +
      '<option value="Mechanic">Mechanic</option>' +
      '<option value="ToolPusher">ToolPusher</option>' +
      '<option value="Assistant Driller">Assistant Driller</option>' +
      '</select></div>' +
      '<div class="col-lg-2 control-padding"><select id="Status" class="form-control"><option value="Select any">Select</option>' +
      '<option value="Master/OIM">Master/OIM</option>' +
      '<option value="Person Performing Work">Person Performing Work</option>' +
      '<option value="Area Authority">Area Authority</option>' +
      '<option value="Responsible Person">Responsible Person</option>' +
      '</select></div>' +
      '<div class="col-lg-3 control-padding"><textarea type="text" name="Works to be Performed[]" class="form-control" value="" required /></div>' +
      '<div class="col-lg-3 control-padding"><textarea type="text" name="Requirement[]" class="form-control" value="" required /></div>' +
      // '<div class="col-lg-3 control-padding"><input type="textbox" name="Requirement[]" class="form-control" value="" required></div>'+
      '<div class="col-lg-1"><a href="javascript:void(0);" class="remove_field btn btn-danger" title="Remove Row">X</div>' +
      '</div>');
    SectionDiv.appendTo("#SectionRoles");
    updateItem();
    $("#SectionRoles").on("click", ".remove_field", function (e) {
      e.preventDefault();
      $(this).parent('div').parent('div').parent('div').remove();
      updateItem();
    });
    $(('textarea')).each(function () {

      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');

    }).on('input', function () {

      this.style.height = 'auto';

      this.style.height = (this.scrollHeight) + 'px';

    });

    function updateItem() {
      var inps: HTMLInputElement[] = document.getElementsByName('Item[]') as unknown as HTMLInputElement[];

      for (var i = 0; i < inps.length; i++) {
        inps[i].value = (i + 1).toString();
      }
    }
  }

  //ajax call on submit button for the API URL call
  //create JSON and call ajax

  private GetIPAddress(): void {

    var call = $.ajax({
      url: "https://api.ipify.org/?format=json",
      method: "Get",
      async: false,
      dataType: 'json',
      success: (data) => {
        console.log("Ip address:" + data.ip);
        ipaddress = data.ip;
      },
      error: (textStatus: string, errorThrown: string) => {
        console.log("Ip address failed:" + textStatus + "--" + errorThrown);
      }
    }).responseJSON;
  }
}
