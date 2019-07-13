function makeBookmarksArray() {
    return [
        {
            id: 1,
            title: 'test 1',
            url: 'test1.com',
            rating: '4',
            description: 'Sunt elit incididunt est enim adipisicing deserunt excepteur magna sit amet.'
        },
        {
            id: 2,
            title: 'test 2',
            url: 'test2.com',
            rating: '3',
            description: 'Incididunt aliquip irure occaecat ullamco reprehenderit adipisicing id quis adipisicing eu voluptate deserunt tempor.'
        },
        {
            id: 3,
            title: 'test 3',
            url: 'test3.com',
            rating: '5',
            description: 'Ullamco aute aute nostrud anim occaecat nulla elit proident ipsum occaecat commodo non.'
        },
    ]
}

function makeMaliciousBookmark() {
    const maliciousBookmark = {
      id: 911,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      url: 'https://www.hackers.com',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      rating: 1,
    }
    const expectedBookmark = {
      ...maliciousBookmark,
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousBookmark,
      expectedBookmark,
    }
  }
  
  module.exports = {
    makeBookmarksArray,
    makeMaliciousBookmark,
  }