using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace FWebControls
{
    public enum WebOptionControlType : byte
    {
        Masters = 0,
        Table_View = 1,
        Unit = 2
    }

    public class OptionParameter
    {
        public int iMasterTypeId { get; set; }
        public int iGroupType { get; set; }
        public string sFilter { get; set; }
        public string sExtraFilter { get; set; }
        public string sSearchKey { get; set; }
        public int iExistingDataCount { get; set; }
        public string sTableName { get; set; }
        public string sPrimaryField { get; set; }
        public string sDisplayField { get; set; }
        public string sMandatoryFields { get; set; }

        public int iUnitId { get; set; }
        public int iItemId { get; set; }
        public int iGroupId { get; set; }
        public bool bLoadAll { get; set; }
        public bool bUseRestriction { get; set; }
        public int iSearchBy { get; set; }
        public int iParam { get; set; }
        public WebOptionControlType ControlType { get; set; }

        public bool bShowAllCols { get; set; }
        public int iSelectedId { get; set; } // Used in F2 case
        public int iCompanyId { get; set; }
        public long lAccTypes { get; set; }
    }

    public class OptionColumnMetaData
    {
        public int Index { get; set; }
        public int Width { get; set; }
        public String Name { get; set; }
        public Boolean Hidden { get; set; }
        public String Align { get; set; }
    }

    public class OptionColumnValue
    {
        public string sValue { get; set; }
        public bool bHasData { get; set; }
    }

    public class OptionData
    {
        public int CompareValueIndex { get; set; }
        public int StoreValueIndex { get; set; }
        public int OriginalFirstField { get; set; }
        public short FirstField { get; set; }
        public List<OptionColumnMetaData> ColumnMetaData { get; set; }
        public List<OptionColumnValue[]> ColumnValue { get; set; }
        public String Error { get; set; }
    }

    public class FBaseControl
    {
        public String Id { get; set; }
        public String Name { get; set; }
        public String ClassName { get; set; }
        public Object Value { get; set; }
        public Object DefaultValue { get; set; }
        public Boolean Mandatory { get; set; }
        public Boolean Disabled { get; set; }
        public String Width { get; set; }

        public String Height { get; set; }

        public Boolean AutoFit { get; set; }
        public Boolean EnableBootstrap { get; set; }
        private Dictionary<String, String> Attributes { get; set; }
        private Dictionary<String, String> Style { get; set; }

        public string onFocus { get; set; }
        public string onLeave { get; set; }
        public string onKeyDown { get; set; }
        public string onDataLoaded { get; set; }

        public string onDataChange { get; set; }
        public string onMultipleSelectedSearch { get; set; }
        public string PlaceHolder { get; set; }
        public string ToolTip { get; set; }

        public FBaseControl()
        {
            Id = String.Empty;
            Name = String.Empty;
            ClassName = String.Empty;
            Value = null;
            DefaultValue = null;
            Mandatory = false;
            Disabled = false;
            AutoFit = false;
            EnableBootstrap = false;

            Attributes = new Dictionary<String, String>();
            Style = new Dictionary<String, String>();

            onFocus = string.Empty;
            onLeave = string.Empty;
            onKeyDown = string.Empty;
            onDataLoaded = string.Empty;
            onDataChange = string.Empty;
            onMultipleSelectedSearch = string.Empty;
            PlaceHolder = string.Empty;
            ToolTip = string.Empty;
        }

        public void ClearAttributes()
        {
            if (Attributes != null)
            {
                Attributes.Clear();
            }
        }

        public void ClearStyle()
        {
            if (Style != null)
            {
                Style.Clear();
            }
        }

        public void AddAttribute(String sName, String sValue)
        {
            try
            {
                Attributes.Add(sName, sValue);
            }
            catch (Exception) { }
        }

        public void AddStyle(String sStyle, String sValue)
        {
            try
            {
                Style.Add(sStyle, sValue);
            }
            catch (Exception) { }
        }

        public int GetStyleCount()
        {
            if (Style == null)
            {
                return (0);
            }

            return (Style.Count);
        }

        public String GetStyleString()
        {
            String sStyle = String.Empty;

            foreach (string key in Style.Keys)
            {
                sStyle += String.Format(" {0}:{1}; ", key, Style[key]);
            }

            return (sStyle);
        }

        public int IsStyleExist(String sStyle, ref String sValue)
        {
            int iIndex = 0;

            sValue = String.Empty;
            if (Style.Count > 0)
            {
                iIndex = 0;
                foreach (string key in Style.Keys)
                {
                    if (key == sStyle)
                    {
                        sValue = Style[key];

                        return (iIndex);
                    }

                    iIndex++;
                }
            }

            return (-1);
        }

        public int GetAttributeCount()
        {
            if (Attributes == null)
            {
                return (0);
            }

            return (Attributes.Count);
        }

        public String GetAttributesString()
        {
            String sValue = String.Empty;

            foreach (string key in Attributes.Keys)
            {
                sValue += String.Format(" data-{0}='{1}' ", key, Attributes[key]);
            }

            return (sValue);
        }


    }

    public class FOption : FBaseControl
    {
        public bool Web9 { get; set; }
        public String URL { get; set; }
        public string SearchUIURL { get; set; }
        public string CustomizeUIURL { get; set; }
        public string BarcodeProductURL { get; set; }
        public bool IsBarcode { get; set; }
        public int MasterTypeId { get; set; }
        public int GroupType { get; set; }
        public string Filter { get; set; }
        public string ValueFilterField { get; set; } // This is used in OPTIONCONTROL.setControlValue method
        public bool KeepUnmatchedData { get; set; }
        public bool ExactMatch { get; set; }
        public string PrimaryField { get; set; }
        public string DisplayField { get; set; }
        public string TableName { get; set; }
        public string MandatoryField { get; set; }
        public string UserData { get; set; }
        public bool ReadOnly { get; set; }
        public int MaxLength { get; set; }
        public bool UseRestriction { get; set; }
        public bool NoCustomize { get; set; }
        public bool NoDropdown { get; set; }
        public string BarcodeDataLoaded { get; set; }
        public string DataNotFoundHandler { get; set; }
        public string AfterPopupDisplayedHandler { get; set; }
        public WebOptionControlType ControlType { get; set; }
        public bool ShowAllColumns { get; set; }
        public bool WorkAsComboBox { get; set; }
        public string ComboHeading { get; set; }
        public string FieldName { get; set; }
        public bool MultipleSelectSearch { get; set; }
        public long AccTypes { get; set; }
        public bool TextSelectionType { get; set; }

        public FOption()
        { }

        public void Reset()
        {
            Id = String.Empty;
            Name = String.Empty;
            ClassName = String.Empty;
            Value = null;
            Mandatory = false;
            Width = String.Empty;
            URL = String.Empty;
            SearchUIURL = string.Empty;
            CustomizeUIURL = string.Empty;
            BarcodeProductURL = string.Empty;
            IsBarcode = false;
            MasterTypeId = 0;
            GroupType = 0;
            ValueFilterField = String.Empty;
            ExactMatch = true;
            PrimaryField = String.Empty;
            DisplayField = String.Empty;
            TableName = String.Empty;
            MandatoryField = String.Empty;
            onFocus = string.Empty;
            onLeave = string.Empty;
            onKeyDown = string.Empty;
            onDataLoaded = string.Empty;
            onDataChange = string.Empty;
            onMultipleSelectedSearch = string.Empty;
            UserData = string.Empty;
            ReadOnly = false;
            MaxLength = 0;
            PlaceHolder = string.Empty;
            ToolTip = string.Empty;
            UseRestriction = true;
            NoCustomize = false;
            NoDropdown = false;
            BarcodeDataLoaded = string.Empty;
            DataNotFoundHandler = string.Empty;
            AfterPopupDisplayedHandler = string.Empty;
            ControlType = WebOptionControlType.Masters;
            ShowAllColumns = false;
            WorkAsComboBox = false;
            this.ComboHeading = string.Empty;
            this.FieldName = string.Empty;
            this.Web9 = false;
            this.MultipleSelectSearch = false;
            this.AccTypes = 0;
            this.TextSelectionType = false;

            ClearAttributes();
            ClearStyle();
        }

        public void CreateControl(string sId = "", string sName = "", string sValue = "", bool bMandatory = false, string sWidth = "", string sHeight = "", string sURL = "", int iMasterTypeId = 0, int iGroupType = -1, long AccTypes = 0, string sFilter = "", string sValueFilterField = "", bool bExactMatch = true, bool bReadOnly = false, string sMandatoryField = "", string sOnFocus = "", string sOnLeave = "", string sOnKeyDown = "", string sOnDataLoaded = "", string sOnDataChange = "", string sOnDataNotFound = "", string sClassName = "", string sUserData = "", int iMaxLength = 0, string sPlaceHolder = "", string sToolTip = "", string sAfterPopupDisplayed = "", bool bNoCustomize = false, bool bShowAllColumns = false)
        {
            Id = sId;
            Name = sName;
            Value = sValue;
            Mandatory = bMandatory;
            Width = sWidth;
            Height = sHeight;
            URL = sURL;
            MasterTypeId = iMasterTypeId;
            GroupType = iGroupType;
            Filter = sFilter;
            ValueFilterField = sValueFilterField;
            ExactMatch = bExactMatch;
            ReadOnly = bReadOnly;
            MandatoryField = sMandatoryField;
            onFocus = sOnFocus;
            onLeave = sOnLeave;
            onKeyDown = sOnKeyDown;
            onDataLoaded = sOnDataLoaded;
            onDataChange = sOnDataChange;
            DataNotFoundHandler = sOnDataNotFound;
            AfterPopupDisplayedHandler = sAfterPopupDisplayed;
            ClassName = sClassName;
            UserData = sUserData;
            MaxLength = iMaxLength;
            PlaceHolder = sPlaceHolder;
            ToolTip = sToolTip;
            NoCustomize = bNoCustomize;
            ControlType = WebOptionControlType.Masters;
            ShowAllColumns = bShowAllColumns;
            this.AccTypes = AccTypes;
        }

        public void CreateControl(string sId = "", string sName = "", string sValue = "", bool bMandatory = false, string sWidth = "", string sHeight = "", string sURL = "", string sTableName = "", string sPrimaryField = "", string sDisplayField = "", string sFilter = "", string sValueFilterField = "", bool bExactMatch = true, bool bReadOnly = false, string sMandatoryField = "", string sOnFocus = "", string sOnLeave = "", string sOnKeyDown = "", string sOnDataLoaded = "", string sOnDataChange = "", string sOnDataNotFound = "", string sClassName = "", string sUserData = "", int iMaxLength = 0, string sPlaceHolder = "", string sToolTip = "", string sAfterPopupDisplayed = "", bool bTextSelectionType = false, bool bNoCustomize = false)
        {
            Id = sId;
            Name = sName;
            Value = sValue;
            Mandatory = bMandatory;
            Width = sWidth;
            Height = sHeight;
            URL = sURL;
            MasterTypeId = 0;
            GroupType = 0;
            Filter = sFilter;
            ValueFilterField = sValueFilterField;
            ExactMatch = bExactMatch;
            ReadOnly = bReadOnly;
            PrimaryField = sPrimaryField;
            DisplayField = sDisplayField;
            TableName = sTableName;
            MandatoryField = sMandatoryField;
            onFocus = sOnFocus;
            onLeave = sOnLeave;
            onKeyDown = sOnKeyDown;
            onDataLoaded = sOnDataLoaded;
            onDataChange = sOnDataChange;
            DataNotFoundHandler = sOnDataNotFound;
            AfterPopupDisplayedHandler = sAfterPopupDisplayed;
            ClassName = sClassName;
            UserData = sUserData;
            MaxLength = iMaxLength;
            PlaceHolder = sPlaceHolder;
            ToolTip = sToolTip;
            NoCustomize = bNoCustomize;
            ControlType = WebOptionControlType.Table_View;
            ShowAllColumns = true;

            this.TextSelectionType = bTextSelectionType;
            if (bExactMatch == true)
            {
                this.TextSelectionType = false;
            }
        }

        public void CreateControl(string sId, WebOptionControlType optControlType, string sName = "", string sValue = "", bool bMandatory = false, string sWidth = "", string sHeight = "", string sURL = "", string sFilter = "", bool bReadOnly = false, string sOnFocus = "", string sOnLeave = "", string sOnKeyDown = "", string sOnDataLoaded = "", string sOnDataChange = "", string sOnDataNotFound = "", string sClassName = "", string sUserData = "", int iMaxLength = 0, string sPlaceHolder = "", string sToolTip = "", string sAfterPopupDisplayed = "", bool bNoCustomize = false)
        {
            Id = sId;
            Name = sName;
            Value = sValue;
            Mandatory = bMandatory;
            Width = sWidth;
            Height = sHeight;
            URL = sURL;
            MasterTypeId = 0;
            GroupType = 0;
            Filter = sFilter;
            ReadOnly = bReadOnly;
            onFocus = sOnFocus;
            onLeave = sOnLeave;
            onKeyDown = sOnKeyDown;
            onDataLoaded = sOnDataLoaded;
            onDataChange = sOnDataChange;
            DataNotFoundHandler = sOnDataNotFound;
            AfterPopupDisplayedHandler = sAfterPopupDisplayed;
            ClassName = sClassName;
            UserData = sUserData;
            MaxLength = iMaxLength;
            PlaceHolder = sPlaceHolder;
            ToolTip = sToolTip;
            NoCustomize = bNoCustomize;
            ControlType = optControlType;
            ShowAllColumns = true;
        }

        public void CreateControl(string sHeading, string sId, string sName = "", string sValue = "", bool bExactMatch = true, bool bReadOnly = false, string sOnFocus = "", string sOnLeave = "", string sOnKeyDown = "", string sOnDataChange = "", string sOnDataNotFound = "", string sClassName = "", string sUserData = "", string sPlaceHolder = "", string sToolTip = "")
        {
            Reset();

            Id = sId;
            Name = sName;
            Value = sValue;
            ExactMatch = bExactMatch;
            ReadOnly = bReadOnly;
            onFocus = sOnFocus;
            onLeave = sOnLeave;
            onKeyDown = sOnKeyDown;
            onDataChange = sOnDataChange;
            DataNotFoundHandler = sOnDataNotFound;
            ClassName = sClassName;
            UserData = sUserData;
            PlaceHolder = sPlaceHolder;
            ToolTip = sToolTip;
            NoCustomize = true;
            WorkAsComboBox = true;
            ComboHeading = sHeading;
        }

        public IHtmlString GetHtml()
        {
            if (this.Web9 == true)
            {
                return (this.GetHtmlFor9Web());
            }

            return (this.GetHtmlFor8Web());
        }

        private IHtmlString GetHtmlFor8Web()
        {
            string sValue = string.Empty;
            string sStyle = string.Empty;
            string sSettingsStyle = string.Empty;
            string sDropdownStyle = string.Empty;
            string sStylePopup = string.Empty;
            string sResult = string.Empty;
            string sAttributeString = string.Empty;
            string sReadOnly = string.Empty;
            string sMaxLength = string.Empty;
            string sCustomizeClick = string.Empty;
            string sDropdownClick = string.Empty;
            int iExactMatch = 0;
            bool bIsBarcode = false;
            StringBuilder sb = null;

            try
            {
                if (string.IsNullOrEmpty(Id) == true)
                {
                    throw new Exception("Id is mandatory in creating option control.");
                }

                if (string.IsNullOrEmpty(Name) == true)
                {
                    Name = Id;
                }


                sStyle = string.Format(" style=\"width: {0};", string.IsNullOrEmpty(Width) == true ? " 100%" : Width);

                sStyle += " border: none; ";

                if (GetStyleCount() > 0)
                {
                    if (string.IsNullOrEmpty(sStyle) == true)
                    {
                        sStyle = " style=\"";
                    }

                    sStyle += GetStyleString();
                }

                if (string.IsNullOrEmpty(sStyle) == false)
                {
                    sStyle += "\"";
                }


                sb = new StringBuilder();

                iExactMatch = ExactMatch == true ? 1 : 0;
                this.ClassName = string.IsNullOrEmpty(ClassName) == true ? "" : ClassName;
                this.Height = string.IsNullOrEmpty(Height) == true ? "" : string.Format(" height: {0};", Height);
                this.MandatoryField = string.IsNullOrEmpty(MandatoryField) == true ? "" : MandatoryField;
                this.UserData = string.IsNullOrEmpty(UserData) == true ? "" : UserData;
                sAttributeString = GetAttributesString();
                sReadOnly = ReadOnly == true ? "disabled" : "";
                sMaxLength = this.MaxLength > 0 ? string.Format(" maxlength='{0}' ", MaxLength) : "";
                this.FieldName = Convert.ToString(this.FieldName);

                if (this.MasterTypeId > 0 && this.IsBarcode == true)
                {
                    bIsBarcode = true;
                }

                if (NoCustomize == true)
                {
                    sSettingsStyle = "color: lightgray; ";
                }
                else
                {
                    sSettingsStyle = "cursor: pointer; ";
                    sCustomizeClick = $"OPTIONCONTROL_INTERNAL.settingsClick('{this.Id}', event);";
                }

                if (NoDropdown == true)
                {
                    sDropdownStyle = "color: lightgray; ";
                }
                else
                {
                    sDropdownStyle = "cursor: pointer; ";
                    sDropdownClick = $"OPTIONCONTROL_INTERNAL.dropdownClick('{this.Id}', event);";
                }

                if (this.ExactMatch == true)
                {
                    this.TextSelectionType = false;
                }

                sb.Append($@"<table id='{this.Id}_input_container' {sStyle} cellpadding='20' cellspacing='0' > 
                                    <tbody>
                                        <tr><td style='padding:0px;border:none;'><div id='{this.Id}_search_container'></div></td></tr>
                                        <tr style='width:100%;'>
                                            <td style='width:100%; padding:0px; border: none;'>
                                                <input id='{this.Id}_data' class='{this.Id}_data_class' type='hidden'  />
                                                <input id='{this.Id}' Name='{this.Name}' type='text' autocomplete='off' 
                                                autocorrect='off' autocapitalize='off' spellcheck='false' 
                                                style =' {this.Height}' class='FOptionControl optioncontrol_input {this.ClassName}' 
                                                onfocus='OPTIONCONTROL_INTERNAL.onFocus(this, event);' 
                                                onblur=""OPTIONCONTROL_INTERNAL.leaveFocus(this, event);"" 
                                                oninput=""OPTIONCONTROL_INTERNAL.input(this, event, '{this.URL}')"" 
                                                onkeydown=""OPTIONCONTROL_INTERNAL.keydown(this, event, '{this.URL}');"" 
                                                onkeyup=""OPTIONCONTROL_INTERNAL.keyup(this, event, '{this.URL}');"" 
                                                data-mastertypeid='{this.MasterTypeId}' 
                                                data-grouptype='{this.GroupType}' 
                                                data-filter=""{this.Filter}"" 
                                                data-extrafilter='' 
                                                data-url='{this.URL}' 
                                                data-searchuiurl='{this.SearchUIURL}'
                                                data-customizeuiurl='{this.CustomizeUIURL}' 
                                                data-barcodeproducturl='{this.BarcodeProductURL}' 
                                                data-valuefilterfield='{this.ValueFilterField}' 
                                                data-keepunmatcheddata='{this.KeepUnmatchedData}' 
                                                data-exactmatch='{iExactMatch}' 
                                                data-tablename='{this.TableName}' 
                                                data-primaryfield='{this.PrimaryField}' 
                                                data-displayfield='{this.DisplayField}' 
                                                data-onleave='{this.onLeave}' 
                                                data-ondataloaded='{this.onDataLoaded}' 
                                                data-onmultipleselectedsearch='{this.onMultipleSelectedSearch}' 
                                                data-mandatoryfield='{this.MandatoryField}' {sReadOnly} {sMaxLength} 
                                                data-ondatachange='{this.onDataChange}' 
                                                data-bmandatory='{this.Mandatory}' 
                                                data-onfocus='{this.onFocus}' 
                                                data-onkeydown='{this.onKeyDown}' 
                                                data-ondatanotfound='{this.DataNotFoundHandler}' 
                                                data-userdata='{this.UserData}' 
                                                data-i_SearchBy='-1' 
                                                data-i_firstfield='-1' 
                                                data-i_originalfirstfield='-1' 
                                                data-isbarcode='{bIsBarcode}'
                                                placeholder='{this.PlaceHolder}'
                                                data-toggle='tooltip' title='{this.ToolTip}'
                                                data-userrestriction='{this.UseRestriction}'   
                                                data-barcodedataloaded='{this.BarcodeDataLoaded}'
                                                data-afterpopupdisplayed='{this.AfterPopupDisplayedHandler}'
                                                data-controltype='{Convert.ToByte(this.ControlType)}'
                                                data-showallcolumns='{this.ShowAllColumns}'
                                                data-workascombobox='{this.WorkAsComboBox}' 
                                                data-comboheading='{this.ComboHeading}' 
                                                data-fieldname='{this.FieldName}'
                                                data-multipleselectsearch='{this.MultipleSelectSearch}'
                                                data-nodropdown='{this.NoDropdown}' 
                                                data-acctypes='{this.AccTypes}' 
                                                data-textselectiontype='{this.TextSelectionType}' 
                                                {sAttributeString} />
                                            </td>
                                            <td id='{this.Id}_input_image' style='width:20px; {sDropdownStyle}; padding:0px;border:none;' onmousedown='return false;' >
                                                <span class='icon-down-arrow optioncontrol_arrow_margin' style='font-size:10px;' 
                                                    onclick=""{sDropdownClick}"">
                                                </span>
                                            </td>
                                            <td id='{this.Id}_input_settings' style='width:20px; {sSettingsStyle}; padding:0px;border:none;' onmousedown='return false;' >
                                                <span class='icon-settings optioncontrol_settings_margin' style='font-size:10px;' 
                                                    onclick=""{sCustomizeClick}"">
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style='padding: 0px;border:none;'>");

                if (IsStyleExist("margin-left", ref sValue) >= 0)
                {
                    sStylePopup = String.Format("margin-left: {0}", sValue);
                }

                sb.AppendFormat("<div id=\"{0}_container\" class=\"option_container\" style=\"z-index:1; position: absolute; display:none; {1}; \" >", Id, sStylePopup);
                sb.Append("<div style=\"width:100%; overflow:hidden\">");
                sb.AppendFormat("<table id=\"{0}_table_head\" cellspacing=\"0\" cellpadding=\"0\" style=\"table-layout: fixed; \">", Id);
                sb.Append("</table>");
                sb.Append("</div>");

                sb.AppendFormat("<div id=\"{0}_div_data\" style=\"width: 100%;    margin-left: 2px; height: 85%; overflow-y: auto; overflow-x: hidden;\">", Id);
                sb.AppendFormat("<table id=\"{0}_table_data\" class=\"option_data\" cellspacing=\"0\" cellpadding=\"0\" style=\"width: 100%; cursor: default; table-layout: fixed; border-collapse: separate; border-spacing: 0px;  border-color: grey;\">", Id);
                sb.Append("</table>");
                sb.Append("</div>");
                sb.Append("</div>");


                sb.AppendFormat("<script type=\"text/javascript\"> var g_{0}_data = []; var g_{0}_metadata = []; ", Id);
                if (String.IsNullOrEmpty(Convert.ToString(Value)) == false)
                {
                    sb.AppendFormat("OPTIONCONTROL.setControlValue('{0}', '{1}');", Id, Value);
                }

                sb.Append("</script>");

                sb.Append($@"</td>
                            </tr>                            
                            </tbody>
                            </table>");
            }
            catch (Exception ex)
            {
                sb = new StringBuilder();
                sb.AppendFormat("<div><span style=\"color:red;font-weight:bold\">ERROR:</span> {0}</div>", ex.Message);
            }

            return System.Web.Mvc.MvcHtmlString.Create(sb.ToString());
        }

        private IHtmlString GetHtmlFor9Web()
        {
            string sValue = string.Empty;
            string sStyle = string.Empty;
            string sSettingsStyle = string.Empty;
            string sDropdownStyle = string.Empty;
            string sStylePopup = string.Empty;
            string sResult = string.Empty;
            string sAttributeString = string.Empty;
            string sReadOnly = string.Empty;
            string sMaxLength = string.Empty;
            string sCustomizeClick = string.Empty;
            string sDropdownClick = string.Empty;
            int iExactMatch = 0;
            bool bIsBarcode = false;
            StringBuilder sb = null;

            try
            {
                if (string.IsNullOrEmpty(Id) == true)
                {
                    throw new Exception("Id is mandatory in creating option control.");
                }

                if (string.IsNullOrEmpty(Name) == true)
                {
                    Name = Id;
                }


                sStyle = string.Format(" style=\"width: {0};", string.IsNullOrEmpty(Width) == true ? " 100%" : Width);

                sStyle += " border: none; ";

                if (GetStyleCount() > 0)
                {
                    if (string.IsNullOrEmpty(sStyle) == true)
                    {
                        sStyle = " style=\"";
                    }

                    sStyle += GetStyleString();
                }

                if (string.IsNullOrEmpty(sStyle) == false)
                {
                    sStyle += "\"";
                }


                sb = new StringBuilder();

                iExactMatch = ExactMatch == true ? 1 : 0;
                this.ClassName = string.IsNullOrEmpty(ClassName) == true ? "" : ClassName;
                this.Height = string.IsNullOrEmpty(Height) == true ? "" : string.Format(" height: {0};", Height);
                this.MandatoryField = string.IsNullOrEmpty(MandatoryField) == true ? "" : MandatoryField;
                this.UserData = string.IsNullOrEmpty(UserData) == true ? "" : UserData;
                sAttributeString = GetAttributesString();
                sReadOnly = ReadOnly == true ? "disabled" : "";
                sMaxLength = this.MaxLength > 0 ? string.Format(" maxlength='{0}' ", MaxLength) : "";
                this.FieldName = Convert.ToString(this.FieldName);

                if (this.MasterTypeId > 0 && this.IsBarcode == true)
                {
                    bIsBarcode = true;
                }

                if (NoCustomize == true)
                {
                    sSettingsStyle = "color: lightgray; ";
                }
                else
                {
                    sSettingsStyle = "cursor: pointer; ";
                    sCustomizeClick = $"OPTIONCONTROL_INTERNAL.settingsClick('{this.Id}', event);";
                }

                if (NoDropdown == true)
                {
                    sDropdownStyle = "color: lightgray; ";
                }
                else
                {
                    sDropdownStyle = "cursor: pointer; ";
                    sDropdownClick = $"OPTIONCONTROL_INTERNAL.dropdownClick('{this.Id}', event);";
                }

                if (this.ExactMatch == true)
                {
                    this.TextSelectionType = false;
                }

                sb.Append($@"<table id='{this.Id}_input_container' {sStyle} cellpadding='0' cellspacing='0' > 
                                    <tbody>
                                        <tr><td style='padding:0px;border:none;'><div id='{this.Id}_search_container'></div></td></tr>
                                        <tr style='width:100%;'>
                                            <td style='width:100%; padding:0px; border: none;'>
                                                <input id='{this.Id}_data' class='{this.Id}_data_class' type='hidden'  />
                                                <input id='{this.Id}' Name='{this.Name}' type='text' autocomplete='off' 
                                                autocorrect='off' autocapitalize='off' spellcheck='false' 
                                                style =' {this.Height}' class='FOptionControl optioncontrol_input {this.ClassName}' 
                                                onfocus='OPTIONCONTROL_INTERNAL.onFocus(this, event);' 
                                                onblur=""OPTIONCONTROL_INTERNAL.leaveFocus(this, event);"" 
                                                oninput=""OPTIONCONTROL_INTERNAL.input(this, event, '{this.URL}')"" 
                                                onkeydown=""OPTIONCONTROL_INTERNAL.keydown(this, event, '{this.URL}');"" 
                                                onkeyup=""OPTIONCONTROL_INTERNAL.keyup(this, event, '{this.URL}');"" 
                                                data-mastertypeid='{this.MasterTypeId}' 
                                                data-grouptype='{this.GroupType}' 
                                                data-filter=""{this.Filter}"" 
                                                data-extrafilter='' 
                                                data-url='{this.URL}' 
                                                data-searchuiurl='{this.SearchUIURL}'
                                                data-customizeuiurl='{this.CustomizeUIURL}' 
                                                data-barcodeproducturl='{this.BarcodeProductURL}' 
                                                data-valuefilterfield='{this.ValueFilterField}' 
                                                data-keepunmatcheddata='{this.KeepUnmatchedData}' 
                                                data-exactmatch='{iExactMatch}' 
                                                data-tablename='{this.TableName}' 
                                                data-primaryfield='{this.PrimaryField}' 
                                                data-displayfield='{this.DisplayField}' 
                                                data-onleave='{this.onLeave}' 
                                                data-onmultipleselectedsearch='{this.onMultipleSelectedSearch}' 
                                                data-ondataloaded='{this.onDataLoaded}' 
                                                data-mandatoryfield='{this.MandatoryField}' {sReadOnly} {sMaxLength} 
                                                data-ondatachange='{this.onDataChange}' 
                                                data-bmandatory='{this.Mandatory}' 
                                                data-onfocus='{this.onFocus}' 
                                                data-onkeydown='{this.onKeyDown}' 
                                                data-ondatanotfound='{this.DataNotFoundHandler}' 
                                                data-userdata='{this.UserData}' 
                                                data-i_SearchBy='-1' 
                                                data-i_firstfield='-1' 
                                                data-i_originalfirstfield='-1' 
                                                data-isbarcode='{bIsBarcode}'
                                                placeholder='{this.PlaceHolder}'
                                                data-toggle='tooltip' title='{this.ToolTip}'
                                                data-userrestriction='{this.UseRestriction}'   
                                                data-barcodedataloaded='{this.BarcodeDataLoaded}'
                                                data-afterpopupdisplayed='{this.AfterPopupDisplayedHandler}'
                                                data-controltype='{Convert.ToByte(this.ControlType)}'
                                                data-showallcolumns='{this.ShowAllColumns}'
                                                data-workascombobox='{this.WorkAsComboBox}' 
                                                data-comboheading='{this.ComboHeading}' 
                                                data-fieldname='{this.FieldName}'
                                                data-multipleselectsearch='{this.MultipleSelectSearch}'
                                                data-nodropdown='{this.NoDropdown}' 
                                                data-acctypes='{this.AccTypes}' 
                                                data-textselectiontype='{this.TextSelectionType}' 
                                                {sAttributeString} />
                                            </td>
                                            <td id='{this.Id}_input_image' style='width:24px; {sDropdownStyle}; padding:0px;border:none;' onmousedown='return false;' >
                                                <span class='icon-downarrow optioncontrol_arrow_margin'
                                                    onclick=""{sDropdownClick}"">
                                                </span>
                                            </td>
                                            <td id='{this.Id}_input_settings' style='width:24px; {sSettingsStyle}; padding:0px;border:none;' onmousedown='return false;' >
                                                <span class='icon-settings optioncontrol_settings_margin' 
                                                    onclick=""{sCustomizeClick}"">
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style='padding: 0px;border:none;'>");

                if (IsStyleExist("margin-left", ref sValue) >= 0)
                {
                    sStylePopup = String.Format("margin-left: {0}", sValue);
                }

                sb.AppendFormat("<div id=\"{0}_container\" class=\"option_container\" style=\"z-index:1; position: absolute; display:none; {1}; \" >", Id, sStylePopup);
                sb.Append("<div style=\"width:100%; overflow:hidden\">");
                sb.AppendFormat("<table id=\"{0}_table_head\" cellspacing=\"0\" cellpadding=\"0\" style=\"table-layout:fixed;border:none; \">", Id);
                sb.Append("</table>");
                sb.Append("</div>");

                sb.AppendFormat("<div id=\"{0}_div_data\" style=\"width: 100%; height: 85%; overflow-y: auto; overflow-x: hidden;\">", Id);//changed
                sb.AppendFormat("<table id=\"{0}_table_data\" class=\"option_data\" cellspacing=\"0\" cellpadding=\"0\" >", Id);
                sb.Append("</table>");
                sb.Append("</div>");
                sb.Append("</div>");


                sb.AppendFormat("<script type=\"text/javascript\"> var g_{0}_data = []; var g_{0}_metadata = []; ", Id);
                if (String.IsNullOrEmpty(Convert.ToString(Value)) == false)
                {
                    sb.AppendFormat("OPTIONCONTROL.setControlValue('{0}', '{1}');", Id, Value);
                }

                sb.Append("</script>");

                sb.Append($@"</td>
                            </tr>                            
                            </tbody>
                            </table>");
            }
            catch (Exception ex)
            {
                sb = new StringBuilder();
                sb.AppendFormat("<div><span style=\"color:red;font-weight:bold\">ERROR:</span> {0}</div>", ex.Message);
            }

            return System.Web.Mvc.MvcHtmlString.Create(sb.ToString());
        }
    }

}