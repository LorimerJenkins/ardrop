import arweave
from arweave.arweave_lib import Transaction
from arweave.transaction_uploader import get_uploader


def upload_to_arweave(file):

    wallet_file_path = "wallet.json"
    wallet = arweave.Wallet(wallet_file_path)

    print(wallet.balance)

    with open(file, "rb", buffering=0) as file_handler:
        tx = Transaction(wallet, file_handler=file_handler, file_path=file)
        tx.add_tag('Content-Type', 'plain/text')
        tx.sign()

        print(tx.id)

        uploader = get_uploader(tx, file_handler)

        while not uploader.is_complete:
            uploader.upload_chunk()

            print(f"{uploader.pct_complete}% complete, {uploader.uploaded_chunks}/{uploader.total_chunks}")



upload_to_arweave('hello.txt')