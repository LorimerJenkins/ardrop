import arweave



def nelson(message: str):
    import requests
    chat_id = "1682945595"
    TELEGRAMAPI = '6212822344:AAEctAe_1Yke4RgT7Legyk4yfPPxDy0nG-o'

    return(requests.get(f'https://api.telegram.org/bot{TELEGRAMAPI}/sendMessage?chat_id={chat_id}&text={message}').text)




def upload_to_arweave(data):
    wallet_json = {}
    wallet = arweave.Wallet.from_data(wallet_json)
    transaction = arweave.Transaction(wallet, data=data)
    nelson(transaction)
    nelson('hello')
    transaction.add_tag('Content-Type', 'text/plain')
    transaction.sign()
    transaction.send()
    return transaction.id



# SERER SETUP #######################################################################################################################################################
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
@app.route('/file-upload', methods=['POST'])
def file_upload():
    try:
        payload = request.get_json()
        contents = payload['contents']
        tx_id = upload_to_arweave(contents)
        return {'weavetransfer_status': 200, 'response': 'file uploaded', 'transaction_id': tx_id}
    except Exception as error:
        return Response(dumps({'weavetransfer_status': 500, 'response': 'file failed to uploaded', 'error': error}), mimetype='text/json')
# RUN SERVER ##############################################################################################################################################################
if __name__ == '__main__':
    app.run(port=7775)


