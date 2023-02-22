################################################################################################################################################################################
import requests
import json
###############################################################################################################################################################################

###############################################################################################################################################################################





# SERER SETUP #######################################################################################################################################################
# The whole server
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
        requests.get(f'https://api.telegram.org/bot{telegram_api_key}/sendMessage?chat_id={telegram_chat_id_website_hits}&text=Hit')
        return Response(dumps({'wallety_org_server_status': 200}), mimetype='text/json')
    except:
        return Response(dumps({'wallety_org_server_status': 400}), mimetype='text/json')
# Wallet check #####################################################################################################################################################
@app.route('/walletcheck/', methods=['GET'])
def wallet_check_page():
    try:
        wallet_address = str(request.args.get('wallet_address'))
        specified_network = str(request.args.get('specified_network'))
        json_dump = json.dumps(walletCheck(wallet_address, specified_network))
        return json_dump
    except:
        return {'wallety_org_wallet_check_server_status': 500, 'response': 'internal server error, please try again later'}
# Join wallety form ##################################################################################################################################################
@app.route('/joinwalletyform/', methods=['GET'])
def join_w_form():
    try:
        form_name = str(request.args.get('form_name'))
        form_role = str(request.args.get('form_role'))
        form_email = str(request.args.get('form_email'))
        form_project = str(request.args.get('form_project'))
        form_website = str(request.args.get('form_website'))
        form_net = str(request.args.get('form_net'))
        form_comments = str(request.args.get('form_comments'))
        joinForm(form_name, form_role, form_email, form_project, form_website, form_net, form_comments)
        return {'wallety_org_join_wallety_server_status': 200, 'response': True}
    except:
        return {'wallety_org_join_wallety_server_status': 500, 'response': 'internal server error, please try again later'}
# Suggest/bug report ##################################################################################################################################################
@app.route('/suggestion/', methods=['GET'])
def suggestion_form():
    try:
        message = str(request.args.get('suggestion'))
        network = str(request.args.get('network'))
        email = str(request.args.get('suggest_email'))
        suggest_type = str(request.args.get('suggest_type'))
        suggestion(message, network, email, suggest_type)
        return {'wallety_org_suggest_bug_server_status': 200, 'response': True}
    except:
        return {'wallety_org_suggest_bug_server_status': 500, 'response': 'internal server error, please try again later'}
# API wait list ##################################################################################################################################################
@app.route('/apiApply/', methods=['GET'])
def apiApply():
    try:
        name = str(request.args.get('name'))
        email = str(request.args.get('email'))
        comments = str(request.args.get('comments'))
        apiApply(name, email, comments)
        return {'wallety_org_api_apply_server_status': 200, 'response': True}
    except:
        return {'wallety_org_api_apply_server_status': 500, 'response': 'internal server error, please try again later'}





# Data server ###############################################################################################################################################################
# Kusama ##########################################################################################################################################################
@app.route('/kusama/', methods=['GET']) # https://127.0.0.1:7777/kusama/?wallet_address=
def kusama_request_page():
    try:
        wallet_address = str(request.args.get('wallet_address'))
        network = 'kusama'
        coin_price = decimal.Decimal(coinPrice(network))
        json_data = json.dumps(data(wallet_address=wallet_address, wallet_profile=walletProfile, current_dates=currentDates,
                                    paper_diamond_handed=paperDiamondHanded, raw_transfers=rawTransfers,
                                    chain_state=chainState, coin_price=coin_price, network=network))
        return json_data
    except:
        return {'wallety_org_kusama_server_status': 500, 'response': 'internal server error, please try again later'}
# Polkadot ##########################################################################################################################################################
@app.route('/polkadot/', methods=['GET']) # https://127.0.0.1:7777/polkadot/?wallet_address=
def polkadot_request_page():
    try:
        wallet_address = str(request.args.get('wallet_address'))
        network = 'polkadot'
        coin_price = decimal.Decimal(coinPrice(network))
        json_data = json.dumps(data(wallet_address=wallet_address, wallet_profile=walletProfile, current_dates=currentDates,
                                    paper_diamond_handed=paperDiamondHanded, raw_transfers=rawTransfers, chain_state=chainState,
                                    coin_price=coin_price, network=network))
        return json_data
    except:
        return {'wallety_org_polkadot_server_status': 500, 'response': 'internal server error, please try again later'}
# custom data ####################################################################################################################################################
@app.route('/customdata/', methods=['GET'])
def custom_data():
    try:
        wallet_address = str(request.args.get('wallet_address'))
        custom_to = str(request.args.get('to'))
        custom_from = str(request.args.get('from'))
        network = str(request.args.get('network'))

        coin_price = decimal.Decimal(coinPrice(network))

        all_transfers_custom = getTransfers(wallet_address=wallet_address, network=network, coin_price=coin_price)[1]
        custom_data = customTransfers(all_transfers=all_transfers_custom, wallet_address=wallet_address,
                                      custom_to=custom_to, custom_from=custom_from,
                                      coin_price=coin_price, network=network)
        custom_top_accounts = customUniqueWallets(wallet_address=wallet_address, custom_deposits=custom_data[2],
                                                  custom_withdrawals=custom_data[1], custom_transactions=custom_data[3],
                                                  coin_price=coin_price, network=network)

        return_custom = {'custom_data_total': custom_data[0]['custom_total'],
                         'custom_data_withdrawals': custom_data[0]['custom_withdrawal'],
                         'custom_data_deposits': custom_data[0]['custom_deposit'],
                         'custom_top_accounts': custom_top_accounts
                         }
        json_data = json.dumps(return_custom)
        return json_data
    except:
        return {'wallety_org_custom_data_server_status': 500, 'response': 'internal server error, please try again later'}
# general ##########################################################################################################################################################
@app.route('/general/', methods=['GET'])
def general():
    try:
        network = str(request.args.get('network'))
        coin_price = decimal.Decimal(coinPrice(network))
        json_dump = json.dumps(chainState(network=network, coin_price=coin_price))
        return json_dump
    except:
        return {'wallety_org_general_server_status': 500, 'response': 'internal server error, please try again later'}
# RUN SERVER ##############################################################################################################################################################
if __name__ == '__main__':
    app.run(port=7777)