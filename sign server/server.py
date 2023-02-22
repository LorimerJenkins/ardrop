import arweave
from arweave.arweave_lib import Transaction
from arweave.transaction_uploader import get_uploader


def upload_to_arweave(file):
    wallet_file_path = "wallet.json"
    wallet = arweave.Wallet(wallet_file_path)

    file_contents = file.read()  # Read the contents of the file
    tx = Transaction(wallet, data=file_contents)
    tx.add_tag('Content-Type', 'plain/text')
    tx.sign()

    uploader = get_uploader(tx, file_contents)

    while not uploader.is_complete:
        uploader.upload_chunk()

    return tx.id



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
        file = request.files['file']
        tx_id = upload_to_arweave(file)
        return Response(dumps({'weavetransfer_status': 200, 'response': 'file uploaded', 'transaction_id': tx_id}), mimetype='text/json')
    except Exception as error:
        return Response(dumps({'weavetransfer_status': 500, 'response': 'file failed to uploaded', 'error': error}), mimetype='text/json')
# RUN SERVER ##############################################################################################################################################################
if __name__ == '__main__':
    app.run(port=7777)



