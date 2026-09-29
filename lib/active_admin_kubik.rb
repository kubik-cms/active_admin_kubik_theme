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
    end
  end
end
