using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace VMPLChennai.Comman
{
    public class Urls
    {
        readonly static string baseUrl = WebConfigurationManager.AppSettings["Server_API_IP"];
        readonly static string baseAPIUrl = WebConfigurationManager.AppSettings["Wheelsmart_API_IP"];
        public static string DispatchOrder => baseUrl + "/Transactions/Vouchers/Dispatch Order Online~~Pos";
        public static string SalesOrder => baseUrl + "/Transactions/Vouchers/Sales Invoice Online";
        public static string PrintLayout => baseUrl + "/Transactions/PrintLayout";
        public static string TdsJV => baseUrl + "/Transactions/TDS JV";
        public static string VehiclePurchase => baseUrl + "/Transactions/Vehicle Purchase";
        public static string VTI => baseUrl + "/Transactions/Vehicle Transfer In";
        //public static string Sync_Pur_Data => baseAPIUrl + "Wheelsmart/LoadPurchases";
        public static string Sync_Pur_Data => baseAPIUrl + "Wheelsmart";
        // public static string Sync_Pur_Data_update => baseAPIUrl + "Wheelsmart/UpdateRecord";
        public static string Sync_Pur_Data_update => baseAPIUrl + "Wheelsmart";


        public static string CNTRM => baseUrl + "/Transactions/Credit Note Transpoter";
        public static string DNTRM => baseUrl + "/Transactions/Debit Note Transpoter";
        public static string Sync_Sal_Data => baseAPIUrl + "SalesData/LoadSales";
        public static string MasterAccount => baseUrl + "/Masters/Core__Account";
        public static string MasterProduct => baseUrl + "/Masters/Core__Product";
        public static string MasterGurante => baseUrl + "/Masters/Core__Guarantor";
    }
}