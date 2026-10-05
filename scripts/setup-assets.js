const fs = require('fs');
const path = require('path');
const https = require('https');

const imageMap = [
  // Chicks & Birds
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKpvHDpfcpohy7-OfsFKpBxlvbhZV9Er5h5nEfJ2oHF57GLFvxWI8HDcLupsAHkIeiouqnE5yMO075kGZoTiiy1SkyezA3yJpEzM-zkfNQtoSwUyVe_NtkXr6kIx7UhmATPNOojWllDhFhg5wE34DZPWL8DliNGwGLpyHpAhrpmDLu3OBlAzioHbcYuOj1avsy7DjTT-e3x6pTMxxZwZVuo4lhb4n0dXdhnsJf_UQiIek24_ZfvySUSA",
    dest: "public/assets/products/chicks/broiler-chicks.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbiAYCym6vKrg0i5Wc3iCTf6yGsIrGUyOo8tbmri8T4UC2TTO3wahx4RxZb0Xx4oG8ykxVIy36_Fr--SS6Y7dllc5MhebWld6S0aPnyIda8nrihcowYm5z7P3WUcMxK_2OK0-im2JmdmPidvVm1K-FfaKbMgJdmVc__EBzdPMr4q1bP8G5Q4gxWq8Cf1mjOXZoQL9JOHMVxolm-EusEl782kwA0BWSZlTYECPXHgvzxIn2DioPVaKceg",
    dest: "public/assets/products/chicks/asil-pure-chicks.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYoCdsozf696sZXtZcsqyoZSitYSFs9qjMtKMb4AV3ahJxRtBam5i9XkmTmxc9XDZrIDMKyIfXEsGuvOwadFItJ6rahGaLdEO1xdHEw6T6DW6E_65I0lWrNiA7szSCaLOqrp9a-8QDszvq6tkg5u5x6235b4s3BlV2JXnHpBUb2yNnnOAmDMOjbpvVEdYirnwusM0zOgQNJh10hjqQt-vIuT2DmynAkwMrsC6dxiLaGmxnquH17sJFDg",
    dest: "public/assets/products/chicks/sonali-chicks.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIHtGH5laCVPUOgX-_W44PAOtV5CfM9ANUgcdsPWDUHVkZZyAXE_6IGtJfhJA85EqtKZ8iATdglqnjYdSKsToMWUeRQwJvPcuHH0cFiJcN9xprImQhzrJIeilZAGWeKPwxJRUD2v7mEU1e0-yELV3-dNIK8Cj72Zqu2ekTIrOVEAh3X5vBuRCcod8xg1EfVZqHkcJtSfSFNsmQJ0gAyGPRlguJvcoeqNCb5W3fnDlNB-BRKxhJ8NU-9A",
    dest: "public/assets/products/chicks/layer-chicks.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgjgeYDQWHM8molmpOubX0MdvdzziIPdsewLzqhMb3ECU3n36rfDHhiynXPfhInv_MeoCyGDyWVIbB4uLTD69ykmfzZ9gQLWn7r9WvQz03kDA7Gt7PRpj9wLS-26obdHgywk2HmfOW4F2WZNkGwcP3CMX3nQbTfhYWvQ8idWFb7Huu0UVERoZE4SP23YJS0Ul9la-xT4LYfLTdYH6U9myWXeUWtI2YjqBoQwqiAqcP44C57y-nygogcQ",
    dest: "public/assets/products/birds/quail-birds.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEj-Du8yEuutRxNzYbFp83mQNY_BfZBoPJJu43ClVTnCeR2bsASkIIzIqIWGKIH3U-0YA5CzIAHVfjmVe1m7oTxkqUD_BSh-WVHF25oLGbe1VQIxtRyD8GnzFv8-iLSVz445aKze3P-Bd_G9MKUJ5-3wvM2yM9i7U0kO4_VT6wQ61Gw3BS9GiKa5_rDVp0h6NEw93PV5a9foF3tWjCWCD1J3xS6bih0DphOoM-bthuwAqNTaEDjj_F6w",
    dest: "public/assets/products/birds/duck-birds.jpg"
  },
  // Eggs
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUwnQN7vdHjLkhdJcqqbGF4f2dWnWRMXSUZU8BjVx_jgYZYbc6Jt7cFvl_IA_LkHq1Li4wVDEzCuJwlPiuFu7K9ajcHFKTDXLKgVTHlo0IPxr8_EvvJJYQ8dSfdzNYIPjtcIWUywvH31viIRGdaXv24FqVdkaIOTOOtSCYQMJU1r2cPOjToDOQhh528aGFbjLTiVRrJ64Eg8_Wi3qbUC8NjPIXthEv-mrJOc5h03T6ec_gQnJZOHSTig",
    dest: "public/assets/products/eggs/hatching-eggs.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8wicxl1O7qYzi5o-p5D7U1Y2HQFr_lPfzofFvKsoe91SsbiH5B19A3SV7JdA4tNBjHoHAVduPoBSkB0bbTmu_tnRWfMk4gK7-Ug_4veOf9-6huK-Giaj1BRr93Fcw-lhX8zgbwjwUoFh6vO-_QD5e23vmGOu2xCk3lD4eVsQJc2ZAQDqXY0vWkNatbuJfhfdnkhuAsGsBHbQEyB5YUF-BxrAtJZen_ejrReXp-iozUAPS1PS8vcr2FA",
    dest: "public/assets/products/eggs/eating-eggs.jpg"
  },
  // Equipment
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfEp0RP3-HELcrBztPq_mNXsYx9ixLFv3Jo0AYMCWLOt_DJpotXaVVF5BwMKVUsiBjeIWN3wdx1fdUkAk-W1fQIwFShnoe7jjCOrVG8etQkaCi8fpqtAsrQ7PNHeqraAC-Aq7rGcCRd4WkrkCORSd5KMd4AkN6yQXkSxn5AorfKtQ4ZLnH8Zx2DIJ5aIsq5Q_x80d3lynU8J7tD0cSkrPG-oGoSqrAHS27mYlL893JJB-XogsSYWRV7g",
    dest: "public/assets/products/equipment/feeder.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYwF_CT1_lfu9mQD6fobf-DTz3IBmGuU3kTj9PocLpMRnqDh-zmSIkRAh-eaoet8k-dlzCBf44_lTpZOrsGeZc8dcbqml1OKSQ0lMJpCYuJs4guo5A9Z-C40Q0usgYNMGVlA6butwvstsDvpXqefprOFhqI5nMoQJhieSadH7NnozhcNrZUxHyEcvVTQU4-OYK50YrIcyWRykRYF4l2DF1fZgBlKETOWz9wkCGbFD_DUGbrUkwUY3oWg",
    dest: "public/assets/products/equipment/drinker.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuALAvS-ufI_ni_LY7kl6EeuNA6mWOyRXhPBO9Fo1Jj5atOdVZhpSlQ2EKCF-QwLRz6d0NO7gzM_8oCuoz2brtwRLU6f2N0NypXWNoyRL_C7YuY4Jr2r0tsiJMHB2ZbtLIDvYWW05xtz76YHOXZztS-qyYbkKG1o3chqDFc00OH3bEkH3kl-xL0_nH6mASwswqBN9ZOdcBkE0dBRbUAbGRmV7fvtLvxWVQQy4PsG02cUGHXqXI0pFmtO-w",
    dest: "public/assets/products/equipment/cages.jpg"
  },
  // Incubators
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk-cf3xKkCY79FRnWk8tUhmwH6Z6uQkOqiARljeXZk_Ynq5DcV6F7cRvq8hb9hr_UyhjeNHYI5cebMEdC_X6peijgLRz5A8HI3sresuNzNqWeSda6vwJLCvbSl4i5L0rJHhdfSf-_lN3LckgDYI22AZgkwbaWBQvxWGF9Hlxcd_P_RSaOReLpnBTadU-2LgmKYHxVidq-3IWumIGZ_b5FV97FFaE9HOu-R8r-rxOc74H0mKlZqi3XseA",
    dest: "public/assets/products/incubators/incubator.jpg"
  },
  // Medicines
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2DO-VAyQbczcjyJ635oz3kROJBZ0kTrm5eht7F-FkZAYHuIxtTPRtiiMOc7ny4TcYwgR1Pz5UjDRKz_lFfh43MekteKYO8ZH58IDn6JQFKKauIIw0_OBRpkUjJvW7IDrs7ViEoKhyS5TUp6yrMGBlkpjNk9fWAsUe4Z5PrxQURlzCLMyAwIBJxGrRUWcnmKiWadiZ3BoQKBjLtmQp9dCa9QMpFqAzZhCkmvcwpiEMVBVi4m20Qwv1Mw",
    dest: "public/assets/products/medicines/vaccines.jpg"
  },
  // Feeds
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0-9jndOzhnlJWQyp8UUtdKdo9l3jiYnFofzc-i_96vRyd6DXBknHmA4838o73DyTYpVOyrq-U-iwPn70IuxegxdoHXAz5QLU36Qic2ej_2jpFpSxpxEnduAAVoi3DZ_2htYnjAf8RE8jpbOxSxhykBNzIlSmF9sR0_8zRS_WCEul438nnHjZD5DbjJP1xTvVBzy8coRblxJvaLOzpdRP56mw7DZ9L7GES-ytfZQWOH0LgTJ7SMsWXQQ",
    dest: "public/assets/products/feeds/feed-bag.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDlyHwJvpLVoSbsUnf55SHGONI9gfGVlgKyTFYOhSKz6QpZcmBzKjpx8Z9xnZ2cVX64oJHpNT_FPYEtdPzsSliXJqHTTMxqRrBsBPgM8BOfD4u-q12HLZMu017I-b9FRUkQXCPJf0doggeV7v2tpPZzCfjZsAaZULcuoaNY68y93tpLNN0R5UrzlgN6TtSu7j3soIMSGjK0eaJLqW8ckzgILSJa3hIU0Mn9a7Y8zvFRowDEGIlgc7Ucg",
    dest: "public/assets/products/feeds/fish-feed.jpg"
  },
  // Meat
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpZhpZhrIwPmY8k4T34f8myBcZx4ZhXB7AtWZqAH0CZ37tkaTeNHc3ui5jD0dhfDXWgZgZSoL7qPSEwY48vK7trLL2SnR3Ch37eJEJPUs9Tv_DGpa3NKv7KekfEoaWqK3C5PRFHYLabwH4QntOHa4gBMcTieodm8SwjvmLwZzzauac0fUuC3w0RqOTrTAo9f6nWWQmBsUOtPRsbVcwjtsGIMa-rxV_V0w8KsQPSQUKTilyvAbBIvmrIw",
    dest: "public/assets/products/meat/frozen-meat.jpg"
  },
  // Hero Image
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAX4pNrzEp5-T604xJD3tWM2WMkDn2oXjArknUjxNRuNM5Y1OvdFyT67j4ftO5TkxVYCLArRkwahZ9n_VbGdloy0migRet3_4a6z5bqvfkICXdOKCnWZMdx3f7sZkfdup8mtdDWcrwc5YZgS3FeDa2Hh0O0E0wweeMio7BHr17NHM_fJBHelhUiITeTwG214fpb9jRSxuKqWtxSmRONCC-8_EKE6oLZLOBlr7rVKXoMETg2Xl4R_Vs1g",
    dest: "public/assets/hero-poultry.jpg"
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // handle redirect
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading product images...');
  for (const item of imageMap) {
    const dir = path.dirname(item.dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    try {
      await download(item.url, item.dest);
      console.log(`Saved: ${item.dest}`);
    } catch (e) {
      console.error(`Failed: ${item.dest}`, e.message);
    }
  }
  console.log('All image downloads completed!');
}

run();
