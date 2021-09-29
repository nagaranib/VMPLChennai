using Focus.Common.DataStructs;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using VMPLChennai.Comman;
using VMPLChennai.Models;

namespace VMPLChennai.Controllers
{
    public class CNTransporterController : Controller
    {
        string error = "";
        ClsDataAccessLayer dal = new ClsDataAccessLayer();
        JavaScriptSerializer jss = new JavaScriptSerializer();
        // GET: CNTransporter   Credit Note Transporter
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CNTRM(int CompanyId)
        {
            ViewBag.CompanyId = CompanyId;
            return View();
        }
        [HttpPost]
        public ActionResult CNTRMLoad(int CompanyId, int AccId, string fdate, string tdate)
        {
            try
            {
                TempData["CreditNoteTRM"] = "";
                jss.MaxJsonLength = Int32.MaxValue;
                string filter = "";
                int srNo = 0;
                if (AccId != 0)
                {
                    filter = "and Tag17082957.iMasterId=" + AccId;
                }
                string Qry = $@"select iHeaderId,VoucherNo,dbo.inttodate(iDate)Date,TransporterName,Vendor,FrieghtType,FrieghtRate,City,isnull(DCNo,'')DCNo,DCDate,TransporterID,sum(fQuantity)[Qty],sum(FreightAmount)[FreightAmount],CreditNoteNo from(SELECT tCore_Header_0.iHeaderId ,cCore_Vouchers_0.sAbbr+':'+tCore_Header_0.sVoucherNo[VoucherNo] ,tCore_Header_0.iDate[iDate] ,Tag17082957.sName[TransporterName] ,Tag17082957.iMasterId[TransporterID],BookNo.sName[Vendor] ,vCore_TranHeaderData_0.FrieghtType[FrieghtType] ,vCore_TranHeaderData_0.FrieghtRate[FrieghtRate] ,isnull(vCore_BodyScreenData_0.[Freight Amount],0)[FreightAmount] ,tCore_Indta_0.fQuantity[fQuantity] ,vrCore_City.sName[City] ,vCore_TranHeaderData_0.DCNo[DCNo] ,vCore_TranHeaderData_0.DCDate[DCDate],vCore_TranHeaderData_0.CreditNoteNo[CreditNoteNo] FROM tCore_Header_0 
                        JOIN tCore_Data_0 ON tCore_Data_0.iHeaderId = tCore_Header_0.iHeaderId
                        JOIN cCore_Vouchers_0 WITH(READUNCOMMITTED) ON cCore_Vouchers_0.iVoucherType = tCore_Header_0.iVoucherType
                         JOIN tCore_Indta_0 ON tCore_Indta_0.iBodyId = tCore_Data_0.iBodyId  JOIN vrCore_Product  ON vrCore_Product.iMasterId = tCore_Indta_0.iProduct AND vrCore_Product.iTreeId = 0 LEFT JOIN
                        (
                             SELECT header.iHeaderId, header.DCDate, header.DCNo, header.FrieghtRate, CASE header.FrieghtType WHEN 0 THEN N'Per Ton' WHEN 1 THEN N'Per Trip' END[FrieghtType],header.Transporter,header.CreditNoteNo FROM tCore_HeaderData1282_0 header WITH(READUNCOMMITTED)
                        )vCore_TranHeaderData_0 ON vCore_TranHeaderData_0.iHeaderId = tCore_Header_0.iHeaderId LEFT JOIN vrCore_Account Tag17082957 ON Tag17082957.iMasterId = vCore_TranHeaderData_0.Transporter AND Tag17082957.iTreeId = 0 LEFT JOIN vrCore_Account BookNo ON BookNo.iMasterId = tCore_Data_0.iBookNo AND BookNo.iTreeId = 0 LEFT JOIN
                        (
                             SELECT tCore_Data_0.iBodyId, CASE WHEN iVoucherType = 1282 THEN (mVal21) ELSE 0 END[Freight Amount],CASE WHEN iVoucherType = 1282 THEN mInput21 ELSE 0 END[Freight Amount_Input]
                FROM tCore_Header_0
                JOIN tCore_Data_0 ON tCore_Header_0.iHeaderId = tCore_Data_0.iHeaderId
                JOIN tCore_IndtaBodyScreenData_0 WITH(READUNCOMMITTED) ON tCore_Data_0.iBodyId = tCore_IndtaBodyScreenData_0.iBodyId WHERE(mVal21 <> 0)
                        )vCore_BodyScreenData_0 ON vCore_BodyScreenData_0.iBodyId = tCore_Data_0.iBodyId LEFT JOIN tCore_Data_Tags_0 ON tCore_Data_Tags_0.iBodyId = tCore_Data_0.iBodyId  LEFT JOIN vrCore_City ON vrCore_City.iMasterId = tCore_Data_Tags_0.iTag10 AND vrCore_City.iTreeId = 0 WHERE tCore_Header_0.iDate BETWEEN dbo.DateToInt('{fdate}') AND dbo.DateToInt('{tdate}') {filter} AND(tCore_Header_0.bSuspended = 0) AND(tCore_Data_0.iAuthStatus = 1) AND(tCore_Header_0.iVoucherType = 1282))t where FrieghtRate>0 and CreditNoteNo<>0 group by iHeaderId,VoucherNo,iDate,TransporterName,Vendor,FrieghtType,FrieghtRate,City,DCNo,DCDate,TransporterID,CreditNoteNo";

                DataSet dstblData = ClsDataAccessLayer.GetData1(Qry, CompanyId, ref error);
                var lsttblData = new List<CNTRMModel>();
                
                if (dstblData.Tables[0].Rows.Count > 0 && dstblData !=null)
                {

                    for (int i = 0; i < dstblData.Tables[0].Rows.Count; i++)
                    {
                        srNo = srNo + 1;

                        CNTRMModel t = new CNTRMModel();
                        t.SNO = srNo;
                        t.HEADERID = dstblData.Tables[0].Rows[i]["iHeaderId"].ToString();
                        t.VOUCHERNO = dstblData.Tables[0].Rows[i]["VoucherNo"].ToString();
                        t.VOUCHERDATE = dstblData.Tables[0].Rows[i]["Date"].ToString().Split(' ')[0];
                        
                        t.TRANSNAME = dstblData.Tables[0].Rows[i]["TransporterName"].ToString();
                        t.VENDOR = dstblData.Tables[0].Rows[i]["Vendor"].ToString();
                        t.FREIGHTTYPE = dstblData.Tables[0].Rows[i]["FrieghtType"].ToString();
                        t.FREIGHTRATE = dstblData.Tables[0].Rows[i]["FrieghtRate"].ToString();

                        t.CITY = dstblData.Tables[0].Rows[i]["City"].ToString();
                        t.DCNO = dstblData.Tables[0].Rows[i]["DCNo"].ToString();
                        t.DCDATE = dstblData.Tables[0].Rows[i]["DCDate"].ToString();
                        t.QTY = Math.Round(Convert.ToDouble(dstblData.Tables[0].Rows[i]["Qty"].ToString())).ToString();

                        
                        
                        string ftype = dstblData.Tables[0].Rows[i]["FrieghtType"].ToString();
                        
                        if (ftype == "Per Ton")
                        {
                            double famount = 0;
                            double fqty = Convert.ToDouble(dstblData.Tables[0].Rows[i]["Qty"].ToString());
                            double frate = Convert.ToDouble(dstblData.Tables[0].Rows[i]["FrieghtRate"].ToString());
                            famount = frate * fqty;
                            t.FREIGHTAMOUNT = Math.Round(famount).ToString();
                        }
                        else
                        {
                            t.FREIGHTAMOUNT = Math.Round(Convert.ToDouble(dstblData.Tables[0].Rows[i]["FreightAmount"].ToString())).ToString();
                        }
                        lsttblData.Add(t);
                        
                    }
                }
                var jsonResult = Json(new { status = true, lsttblData }, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                TempData["CreditNoteTRM"] = lsttblData;
                return jsonResult;
            }
            catch (Exception ex)
            {
                FConvert.LogFile("Test.log", "[" + DateTime.Now + "] : TblLoad :" + ex.Message);
                return Json(new { status = false, message = ex.Message });
            }

            //return View();
        }

                        
        public ActionResult PostingData(int CompanyId,string TransAcc, string ExpenseAcc, string TdsAcc, string InvAmt, string tdsvalue, string SGST, string CGST, string IGST, string diffamt,string sessionId)
        {

            try
            {
                #region CreditNote
                Hashtable header = new Hashtable
                            {
                            { "Date",ClsDataAccessLayer.GetDateToInt(Convert.ToDateTime(DateTime.Now.ToString()))},
                            { "SalesAC__Name", ExpenseAcc},
                            { "CustomerAC__Name", TransAcc},
                            { "Department__Name", "None"}
                            
                            };

                List<Hashtable> body = new List<Hashtable>();
                Hashtable row = new Hashtable
                            {
                            { "BL Number__Name", "None" },
                            { "Gross", InvAmt},
                            { "SGST", SGST },
                            { "CGST", CGST },
                            { "IGST", IGST },
                            { "BillNo", "1" },
                            };
                body.Add(row);
                APIResponse.PostResponse pdata = new APIResponse.PostResponse();
                APIResponse.Datum obj1 = new APIResponse.Datum();
                List<APIResponse.Datum> lstobj = new List<APIResponse.Datum>();
                List<int> transId = obj1.TransIds;

                APIResponse.Root proot = new APIResponse.Root();
                var postingData = new PostingData();
                postingData.data.Add(new Hashtable { { "Header", header }, { "Body", body } });
                string sContent = JsonConvert.SerializeObject(postingData);
                FConvert.LogFile("Test.log", "[" + DateTime.Now + "] : SessionId :" + sessionId);
                var response = Focus8API.Post(Urls.CNTRM, sContent, sessionId, ref error);
                var responseData = JsonConvert.DeserializeObject<APIResponse.PostResponse>(response);
                proot = JsonConvert.DeserializeObject<APIResponse.Root>(response);

                lstobj = proot.data;
                transId = lstobj[0].TransIds;
                int headerId = lstobj[0].HeaderId;
                //int trsid=Convert.ToInt32(proot.data[0]["TransIds"]);
                if (responseData.result == -1)
                {
                    return Json(new { status = false, message = $"Insert Record failed Error={responseData.message}" });

                }
                else
                {
                    //return Json(new { status = true, responseData, message = "Successfully Saved" });

                }
                #endregion
                #region POST TDSJV
                Hashtable header1 = new Hashtable
                            {
                            { "Date",ClsDataAccessLayer.GetDateToInt(Convert.ToDateTime(DateTime.Now.ToString()))},
                            { "Department__Name", "None"}
                            };

                List<Hashtable> body1 = new List<Hashtable>();

                string RefId = "";
                DataSet dsSalesAcc = ClsDataAccessLayer.GetData1($@"select iRef from tCore_Header_0 hed join tCore_Data_0 da on hed.iHeaderId=da.iHeaderId join tCore_Refrn_0 core on da.iBodyId=core.iBodyId where hed.iHeaderId= {headerId}", CompanyId, ref error);
                if (dsSalesAcc.Tables[0].Rows.Count > 0)
                {
                    RefId = Convert.ToString(dsSalesAcc.Tables[0].Rows[0]["iRef"]);
                }

                //Hashtable reference = new Hashtable { };

                //reference = new Hashtable
                //    {
                //        {"CustomerId",TdsAcc },
                //        {"Amount",tdsvalue },
                //        {"BillNo","" },
                //        {"reftype","2" },
                //        {"ref",RefId },
                //    };
                //"aptag": 0,
                //"CustomerId": 8898,
                //"Amount": 12575.32,
                //"BillNo": "",
                //"reftype": 2,
                //"mastertypeid": 0,
                //"Reference": "Unrct:1 : 01 Apr 2021",
                //"artag": 0,
                //"ref": 24880,
                //"tag": 0

                Hashtable row1 = new Hashtable
                            {
                            { "CrAccount__Name", TransAcc },
                            { "DrAccount__Name", TdsAcc},
                            { "Amount", tdsvalue }
                            //{ "Reference",reference}
                            };
                body1.Add(row1);

                var postingData1 = new PostingData();
                postingData1.data.Add(new Hashtable { { "Header", header1 }, { "Body", body1 } });
                string sContent1 = JsonConvert.SerializeObject(postingData1);
                FConvert.LogFile("Test.log", "[" + DateTime.Now + "] : SessionId :" + sessionId);
                var response1 = Focus8API.Post(Urls.TdsJV, sContent1, sessionId, ref error);
                var responseData1 = JsonConvert.DeserializeObject<APIResponse.PostResponse>(response1);
                if (responseData1.result == -1)
                {
                    return Json(new { status = false, message = $"TDS JV Posting  failed Error={responseData1.message}" });
                }
                else
                {
                    //return Json(new { status = true, responseData1, message = "Successfully Saved" });

                }
                #endregion

                #region debitnote

                Hashtable header2 = new Hashtable
                            {
                            { "Date",ClsDataAccessLayer.GetDateToInt(Convert.ToDateTime(DateTime.Now.ToString()))},
                            { "PurchaseAC__Name", ExpenseAcc},
                            { "VendorAC__Name", TransAcc},
                            { "Department__Name", "None"}

                            };

                List<Hashtable> body2 = new List<Hashtable>();
                Hashtable row2 = new Hashtable
                            {
                            { "BL Number__Name", "None" },
                            { "Quantity", "1" },
                            { "Rate", diffamt },
                            { "Gross", diffamt},
                            { "SGST", SGST },
                            { "CGST", CGST },
                            { "IGST", IGST },
                            { "BillNo", "1" },
                            };
                body2.Add(row2);
                APIResponse.PostResponse pdata2 = new APIResponse.PostResponse();
                APIResponse.Datum obj2 = new APIResponse.Datum();
                List<APIResponse.Datum> lstobj2 = new List<APIResponse.Datum>();
                List<int> transId2 = obj1.TransIds;

                APIResponse.Root proot2 = new APIResponse.Root();
                var postingData2 = new PostingData();
                postingData2.data.Add(new Hashtable { { "Header", header2 }, { "Body", body2 } });
                string sContent2 = JsonConvert.SerializeObject(postingData2);
                FConvert.LogFile("Test.log", "[" + DateTime.Now + "] : SessionId :" + sessionId);
                var response2 = Focus8API.Post(Urls.DNTRM, sContent2, sessionId, ref error);
                var responseData2 = JsonConvert.DeserializeObject<APIResponse.PostResponse>(response2);
                proot2 = JsonConvert.DeserializeObject<APIResponse.Root>(response2);

                lstobj2 = proot2.data;
                transId2 = lstobj2[0].TransIds;
                int headerId2 = lstobj2[0].HeaderId;
                //int trsid=Convert.ToInt32(proot.data[0]["TransIds"]);
                if (responseData2.result == -1)
                {
                    return Json(new { status = false, message = $"Insert Record failed Error={responseData2.message}" });

                }
                else
                {
                    return Json(new { status = true, responseData2, message = "Successfully Saved" });

                }

                #endregion







            }
            catch (Exception ex)
            {
                FConvert.LogFile("Test.log", "[" + DateTime.Now + "] : PostingTDSJV :" + ex.Message);
                return Json(new { status = false, message = ex.Message });
            }
        }
    }
}