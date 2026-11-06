# frozen_string_literal: true

require "active_admin/kubik_fieldset_helper"

module ActiveAdminKubik
  module Rails
    class Engine < ::Rails::Engine
      initializer "active_admin_kubik.fieldset_helper" do
        ActiveSupport.on_load(:action_view) do
          include ActiveAdmin::KubikFieldsetHelper
        end
      end

      initializer "active_admin_kubik.importmap_pin", after: :load_config_initializers do
        map = defined?(::Rails) && ::Rails.application.config.respond_to?(:kubik_importmap) &&
              ::Rails.application.config.kubik_importmap
        next unless map

        js = root.join("app/assets/javascripts/admin_nav_tabs.js")
        next unless js.exist?

        map.pin "active_admin_kubik/admin_nav_tabs", to: "admin_nav_tabs.js"
      end
    end
  end
end
