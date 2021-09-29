using Focus.Common.DataStructs;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
namespace VMPLChennai.Models
{
    public class ClsDataAccessLayer
    {
        string error = "";
        public static int GetQueryExe(string strSelQry, int CompId, ref string error)
        {
            try
            {
                //  DataSet ds;
                ClsDataAccessLayer.writeLog(strSelQry);
                Database obj = Focus.DatabaseFactory.DatabaseWrapper.GetDatabase(CompId);
                System.Data.Common.DbConnection dbcon = obj.CreateConnection();
                //dbcon.ConnectionString = obj.ConnectionString;
                System.Data.Common.DbCommand cmd = dbcon.CreateCommand();

                // return (obj.ExecuteDataSet(CommandType.Text, strSelQry));


                cmd.CommandTimeout = 0;
                cmd.CommandText = strSelQry;
                int Result = obj.ExecuteNonQuery(cmd);
                cmd.Dispose();
                dbcon.Dispose();
                return Result;
            }
            catch (Exception e)
            {
                error = e.Message;
                return 0;
            }
        }
        public static int GetDateToInt(DateTime dt)
        {
            int val;
            val = Convert.ToInt16(dt.Year) * 65536 + Convert.ToInt16(dt.Month) * 256 + Convert.ToInt16(dt.Day);
            return val;
        }

        public static int GetTimetoInt(string Time)
        {
            int time = 0;
            string[] strt = Time.Split(':');
            if (strt.Count() == 3)
            {
                time = (Convert.ToInt32(strt[0]) * (0x10000)) + (Convert.ToInt32(strt[1]) * (0x100)) + Convert.ToInt32(strt[2]);
            }

            return time;
        }

        public static Date GetIntToDate(int iDate)
        {
            try
            {
                return (new Date(iDate, CalendarType.Gregorean));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int GetVouchertype(string InvName, int CompId)
        {
            string strsql = "Select iVouchertype,sName,sabbr from ccore_vouchers_0 where sabbr='" + InvName + "'";
            DataSet Dst2 = ClsDataAccessLayer.GetData1(strsql, CompId, ref error);

            if (Dst2 != null && Dst2.Tables.Count > 0 && Dst2.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(Dst2.Tables[0].Rows[0]["iVouchertype"]);
            }
            else
            {
                return 0;
            }
        }

        public static DataSet GetData1(string strSelQry, int CompId, ref string error)
        {
            try
            {
                ClsDataAccessLayer.writeLog(strSelQry);
                DataSet ds;
                Database obj = Focus.DatabaseFactory.DatabaseWrapper.GetDatabase(CompId,-1,true);
                System.Data.Common.DbConnection dbcon = obj.CreateConnection();
                //dbcon.ConnectionString = obj.ConnectionString;
                System.Data.Common.DbCommand cmd = dbcon.CreateCommand();

                // return (obj.ExecuteDataSet(CommandType.Text, strSelQry));


                cmd.CommandTimeout = 0;
                cmd.CommandText = strSelQry;
                ds = obj.ExecuteDataSet(cmd);
                cmd.Dispose();
                dbcon.Dispose();
                return ds;
            }
            catch (Exception e)
            {
                error = e.Message;
                return null;
            }
        }

        internal static DataSet GetData1(string retrievequery, int cid, ref object error)
        {
            throw new NotImplementedException();
        }
        public static string GetVoucherno(int CompanyId, int uid, int Vouchertype)
        {
            string error = "";
            DataSet voucher = GetData1("select top 1 sVoucherNo from tCore_Header_0  where iVoucherType=" + Vouchertype + " and iUserId=" + uid + " order by len(svoucherno)desc,svoucherno desc", CompanyId, ref error);
            var Batchvoucherno = Convert.ToString(voucher.Tables[0].Rows[0][0]);
            return Batchvoucherno;
        }
        public static void writeLog(string content)
        {
            StreamWriter objSw = null;

            try
            {
                string sFilePath = @"C:\Windows\Temp\" + DateTime.Now.ToString("ddMM") + "Edvantage_R.txt";
                objSw = new StreamWriter(sFilePath, true);
                objSw.WriteLine(DateTime.Now.ToString() + " " + content + Environment.NewLine);
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (objSw != null)
                {
                    objSw.Flush();
                    objSw.Dispose();
                }
            }
        }
    }
}