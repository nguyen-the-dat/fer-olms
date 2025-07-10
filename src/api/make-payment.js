import PayOS from '@payos/node';

const payOS = new PayOS(
  'aa6fde35-35e1-420a-8a01-834d9b4268cc',        
  'f35541e8-f03b-491b-b1e8-38673bfab86b',
  '625e35f37cf54e591396d79e42ac2c36bdcdf90d9fe2b2cd1070b59edfe60840'
);

export async function verifyAndRecordPayment(data, existingPurchases) {
  try {
    const paymentData = payOS.verifyPaymentWebhookData(data);
    console.log('[PAYOS_WEBHOOK_VALID]', paymentData);

    if (paymentData.code !== '00') {
      return { status: 'ignored', message: 'Payment not successful' };
    }

    const items = data.items;
    if (!items || items.length === 0) {
      return { status: 'error', message: 'Missing items' };
    }

    let userId, courseId;
    try {
      const itemData = JSON.parse(items[0].name);
      userId = itemData.userId;
      courseId = itemData.courseId;
    } catch (err) {
      return { status: 'error', message: 'Invalid items.name format' };
    }

    if (!userId || !courseId) {
      return { status: 'error', message: 'Missing userId or courseId' };
    }

    // Simulate DB check
    const alreadyExists = existingPurchases.some(
      (p) => p.userId === userId && p.courseId === courseId
    );

    if (alreadyExists) {
      return { status: 'already', message: 'Already purchased' };
    }

    // Simulate DB insert
    return {
      status: 'ok',
      data: { userId, courseId },
      message: 'Purchase recorded',
    };
  } catch (error) {
    console.error('[PAYOS_WEBHOOK_ERROR]', error);
    return { status: 'error', message: 'Internal Error' };
  }
}
