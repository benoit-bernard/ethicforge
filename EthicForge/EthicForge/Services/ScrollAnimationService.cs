using Microsoft.JSInterop;

namespace EthicForge.Services;

public sealed class ScrollAnimationService(IJSRuntime jsRuntime)
{
    public async Task InitAsync()
    {
        await jsRuntime.InvokeVoidAsync("EthicForge.initScrollAnimations");
    }

    public async Task ScrollToTopAsync()
    {
        await jsRuntime.InvokeVoidAsync("EthicForge.scrollToTop");
    }
}
