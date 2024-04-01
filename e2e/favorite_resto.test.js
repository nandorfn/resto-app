Feature('favorite resto');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.seeElement('#emptyPage');
  I.see('Your favorite list is empty', '.resto_not_found');
});

Scenario('searching restaurant', async ({ I }) => {
  I.see('Your favorite list is empty', '.resto_not_found');

  I.amOnPage('/');

  I.seeElement('#searchInput');

  I.fillField('#searchInput', 'melting');
  I.pressKey('Enter');

  I.see('Melting Pot', '#restoName');

  I.clearField('#searchInput');
  I.pressKey('Enter');
  I.see('Kafe Kita', '#restoName');
});

Scenario('searching invalid restaurant', async ({ I }) => {
  I.see('Your favorite list is empty', '.resto_not_found');

  I.amOnPage('/');

  I.seeElement('#searchInput');

  I.fillField('#searchInput', 'starbuk');
  I.pressKey('Enter');

  I.see('Restaurant data not found!', '.placeholder');
});

Scenario('add to favorite resto', ({ I }) => {
  I.see('Your favorite list is empty', '.resto_not_found');

  I.amOnPage('/');
  I.seeElement('#card-item__rqdv5juczeskfw1e867');
  I.click(locate('#card-item__rqdv5juczeskfw1e867'));

  I.seeElement('#likeBtn');
  I.click('#likeBtn');

  I.amOnPage('/#/favorite');
  I.seeElement('#card-item__rqdv5juczeskfw1e867');
});

Scenario('Delete from Favorite', ({ I }) => {
  I.see('Your favorite list is empty', '.resto_not_found');

  I.amOnPage('/');
  I.seeElement('#card-item__rqdv5juczeskfw1e867');
  I.click(locate('#card-item__rqdv5juczeskfw1e867'));

  I.seeElement('#likeBtn');
  I.click('#likeBtn');

  I.amOnPage('/#/favorite');
  I.seeElement('#card-item__rqdv5juczeskfw1e867');
  I.click(locate('#card-item__rqdv5juczeskfw1e867'));

  I.seeElement('#likedBtn');
  I.click('#likedBtn');

  I.amOnPage('/#/favorite');
  I.seeElement('#emptyPage');
  I.see('Your favorite list is empty', '.resto_not_found');
});

Scenario('Add review', ({ I }) => {
  I.see('Your favorite list is empty', '.resto_not_found');

  I.amOnPage('/');
  I.seeElement('#card-item__rqdv5juczeskfw1e867');
  I.click(locate('#card-item__rqdv5juczeskfw1e867'));

  I.seeElement('.section-review');
  I.seeElement('#commentName');
  I.seeElement('#commentReview');

  I.fillField('#commentName', 'test-bot');
  I.fillField('#commentReview', 'Sangat menarik');
  I.click('#submitBtn');

  I.see('test-bot', '#username');
  I.see('Sangat menarik', '#userReview');
});

Scenario('Cant add review with one of empty fields', ({ I }) => {
  I.see('Your favorite list is empty', '.resto_not_found');

  I.amOnPage('/');
  I.seeElement('#card-item__rqdv5juczeskfw1e867');
  I.click(locate('#card-item__rqdv5juczeskfw1e867'));

  I.seeElement('.section-review');
  I.seeElement('#commentName');
  I.seeElement('#commentReview');

  I.fillField('#commentName', 'test-bot');

  I.seeAttributesOnElements('#submitBtn', { disabled: true });

  I.fillField('#commentName', '');
  I.fillField('#commentReview', 'Sangat menarik');

  I.seeAttributesOnElements('#submitBtn', { disabled: true });
});

Scenario('showing 404 when restaurant id is not found', ({ I }) => {
  I.see('Your favorite list is empty', '.resto_not_found');

  I.amOnPage('/#/detail/rqd');

  I.seeElement('#error404');
  I.see('Cannot get data!');
});
