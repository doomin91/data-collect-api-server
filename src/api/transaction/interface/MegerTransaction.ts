export default interface MergeTransaction{
    amount: number;
    balance: number;
    cancelYn: 'Y' | 'N';
    date: string;
    storeId: string;
    transactionId: string;
    productId: string;
}