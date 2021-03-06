#!/bin/sh

set -e

echo "Environment: $RAILS_ENV"
echo "Environment: $BUNDLE_GEMFILE"

# install missing gems
bundle check || bundle install

# Remove pre-existing puma/passenger server.pid
rm -f $APP_PATH/tmp/pids/server.pid

# run passed commands
bundle exec ${@}
