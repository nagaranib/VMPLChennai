using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VMPLChennai.Models
{
    public class CNTRMModel
    {
        public int SNO { get; set; }
        public string HEADERID { get; set; }
        public string VOUCHERNO { get; set; }
        public string VOUCHERDATE { get; set; }
        public string TRANSNAME { get; set; }
        public string VENDOR { get; set; }
        public string FREIGHTTYPE { get; set; }
        public string FREIGHTRATE { get; set; }
        public string CITY { get; set; }
        public string DCNO { get; set; }

        public string DCDATE { get; set; }
        public string QTY { get; set; }
        public string FREIGHTAMOUNT { get; set; }
        
    }
}