const axios = require("axios")
module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.clientId = RED.nodes.getNode(n.creds).credentials.clientId;
            this.clientSecret = RED.nodes.getNode(n.creds).credentials.clientSecret;
        } else {
            this.clientId = "";
            this.clientSecret = "";
        }
        var node = this;
        this.name = n.name;

        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = node[i] || msg[i];
                }
            }
            if(!node.url){
                if(node.api){
                    node.url = 'https://openapi.naver.com/v1/search/'+ node.api +'.json';
                }else{
                    node.url = 'https://openapi.naver.com/v1/search/blog.json';
                }
            }
            node.error(node.url);
            node.options = {};
            node.options.headers = {};
            if(node.params){
                node.options.params = node.params;
            }else{
                node.options.params = {};
                node.options.params.query = n.query;
                node.options.params.display = n.display;
                node.options.params.sort = n.sort;
                node.options.params.start = n.start;
                node.options.params.filter = n.filter;
            }
            node.options.headers['X-Naver-Client-Id'] = node.clientId;
            node.options.headers['X-Naver-Client-Secret'] = node.clientSecret;

            axios.get(node.url, node.options)
                .then(function (response){
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function (err){
                    msg.payload = err;
                    node.send(msg);
                });
        });
    }

    RED.nodes.registerType("naversearch", FunctionNode, {
        credentials: {
            clientId: {type:"text"},
            clientSecret: {type:"text"}
        }
    });

    function naversearchApiKey(n){
        RED.nodes.createNode(this, n);
        this.clientId = n.clientId;
        this.clientSecret = n.clientSecret;
    }

    RED.nodes.registerType("naversearchApiKey", naversearchApiKey,{
        credentials: {
            clientId: {type:"text"},
            clientSecret: {type:"text"}
        }
    });
};
