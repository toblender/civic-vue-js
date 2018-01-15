<template>
  <div class="login-page">
    {{msg}}
    <button id="signupButton" class="civic-button-a medium" type="button">
      <span>Log in with Civic</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      msg: 'Simple Civic Signin'
    }
    },
    methods:{
        sendAuthCode:function(){
            this.$router.push('/dashboard');
        },
        civicLoad:function(){
            var civicSip = new civic.sip({ appId: 'HySTIcFVf' });
            var button = document.querySelector('#signupButton');
              button.addEventListener('click', function () {
                civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });
              });

              // Listen for data
              civicSip.on('auth-code-received', function (event) {
                /*
                    event:
                    {
                        event: "scoperequest:auth-code-received",
                        response: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI2Y2EwNTEzMi0wYTJmLTQwZjItYTg2Yi03NTkwYmRjYzBmZmUiLCJpYXQiOjE0OTQyMjUxMTkuMTk4LCJleHAiOjE0OTQyMjUyOTkuMTk4LCJpc3MiOiJjaXZpYy1zaXAtaG9zdGVkLXNlcnZpY2UiLCJhdWQiOiJodHRwczovL3BoNHg1ODA4MTUuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2Iiwic3ViIjoiY2l2aWMtc2lwLWhvc3RlZC1zZXJ2aWNlIiwiZGF0YSI6eyJjb2RlVG9rZW4iOiJjY2E3NTE1Ni0wNTY2LTRhNjUtYWZkMi1iOTQzNjc1NDY5NGIifX0.gUGzPPI2Av43t1kVg35diCm4VF9RUCF5d4hfQhcSLFvKC69RamVDYHxPvofyyoTlwZZaX5QI7ATiEMcJOjXRYQ",
                        type: "code"
                    }
                */

                // encoded JWT Token is sent to the server
                var jwtToken = event.response;

                // Your function to pass JWT token to your server
                this.sendAuthCode(jwtToken);
              });

              civicSip.on('user-cancelled', function (event) {
                /*
                    event:
                    {
                      event: "scoperequest:user-cancelled"
                    }
                */
               });

              civicSip.on('read', function (event) {
                /*
                    event:
                    {
                      event: "scoperequest:read"
                    }
                */
              });

               // Error events.
               civicSip.on('civic-sip-error', function (error) {
                  // handle error display if necessary.
                  console.log('   Error type = ' + error.type);
                  console.log('   Error message = ' + error.message);
               });
        }
        
    },
    mounted(){
    this.civicLoad()
 },

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
