function SaveSteps(){  
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

    $(('textarea')).each(function () {

      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');

    }).on('input', function () {

      this.style.height = 'auto';

      this.style.height = (this.scrollHeight) + 'px';

    });
   }  
   