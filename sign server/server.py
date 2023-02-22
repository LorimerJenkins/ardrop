# SERER SETUP #######################################################################################################################################################
import requests
import json
from json import dumps
from flask_cors import CORS
from flask import *
app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# SERVER ###########################################################################################################################################################
# Home #############################################################################################################################################################
@app.route('/', methods=['GET'])
def home():
    try:
        return Response(dumps({'weavetransfer_status': 200}), mimetype='text/json')
    except:
        return Response(dumps({'weavetransfer_status': 500}), mimetype='text/json')
# Upload #####################################################################################################################################################
@app.route('/walletcheck/', methods=['GET'])
def wallet_check_page():
    try:
        wallet_address = str(request.args.get('wallet_address'))
        return wallet_address
    except:
        return {'weavetransfer_status': 500, 'response': 'internal server error, please try again'}
# RUN SERVER ##############################################################################################################################################################
if __name__ == '__main__':
    app.run(port=7777)

