using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VMPLChennai.Comman
{
    public class APIResponse
    {
        public class Data
        {
            public List<Hashtable> Body { get; set; }
            public Hashtable Header { get; set; }
            public List<Hashtable> Footer { get; set; }
        }
        public class Response
        {
            public string url { get; set; }
            public List<Data> data { get; set; }
            public int result { get; set; }
            public string message { get; set; }
        }
        public class PostResponse
        {
            public string url { get; set; }
            public List<Hashtable> data { get; set; }
            public int result { get; set; }
            public string message { get; set; }
        }
        public class HashData
        {
            //public string url { get; set; }
            public List<Hashtable> data { get; set; }
            public int result { get; set; }
            public string message { get; set; }
            // public string objHashResponse { get; set; }
            // public List<Hashtable> Data { get; internal set; }
        }
        public class Datum
        {
            public int HeaderId { get; set; }
            public string VoucherNo { get; set; }
            public List<int> BodyIds { get; set; }
            public List<int> TransIds { get; set; }
            public object Errors { get; set; }
            public bool Posted { get; set; }
        }

        public class Root
        {
            public string url { get; set; }
            public List<Datum> data { get; set; }
            public int result { get; set; }
            public object message { get; set; }
        }
    }
}