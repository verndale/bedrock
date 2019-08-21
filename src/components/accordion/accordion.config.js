const uniqid = require('uniqid');

module.exports = {
  title: 'Accordion component',
  status: 'wip',
  context: {
    label: 'Example accordion',
    accordions: [
      {
        title: 'Will I earn frequent flier points?',
        content: '<p><a role="link" href="http://www.google.com">asdasd</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis nec diam sed ornare. Praesent tempus magna non porttitor ullamcorper. Phasellus est arcu, hendrerit at finibus quis, tempor eu dolor. Ut fermentum neque vel massa lacinia, ac ornare ligula eleifend. Pellentesque in suscipit lacus. Aenean nec lectus sodales, convallis dui at, facilisis ante.</p> <p>Maecenas fermentum, augue lacinia porttitor ultricies, mauris tellus scelerisque tellus, et lobortis tortor justo ut ipsum. Vestibulum nulla enim, volutpat eget justo sed, aliquam sagittis nisl.</p>',
        uuidTab: uniqid(),
        uuidContent: uniqid()
      },
      {
        title: 'How is my fare calculated?',
        content: '<p>Sed sit amet est semper, varius velit eu, gravida velit. Cras quis elit accumsan, maximus nisi placerat, luctus urna. Nunc aliquet est quis mi pharetra elementum. In ultrices ipsum sem. Praesent fermentum consequat condimentum. Aenean neque ligula, laoreet sed pulvinar eu, vehicula et odio. Ut egestas augue mi, at mollis est efficitur ut. Curabitur eu fermentum sapien. Cras nec suscipit justo. Vivamus a felis cursus sapien rhoncus bibendum non a ipsum. Quisque at aliquet odio. Cras velit diam, vehicula fermentum tellus in, aliquet lacinia massa.</p> <p>Curabitur condimentum, massa quis accumsan ullamcorper, ligula enim semper erat, eget rutrum massa mi ut arcu. Nulla facilisi. Quisque eleifend felis eu varius egestas. Vestibulum gravida, nulla non ultricies pretium, tellus diam hendrerit ligula, nec volutpat velit sem eu enim. Curabitur pellentesque augue elit, eget finibus tortor viverra et. Aenean dapibus semper est, et luctus lacus dignissim ac. Maecenas nec lorem sagittis, dictum odio et, facilisis enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean pretium sapien nec orci suscipit varius.</p>',
        uuidTab: uniqid(),
        uuidContent: uniqid()
      }
    ]
  }
};
